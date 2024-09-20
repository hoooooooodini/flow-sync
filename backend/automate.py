import requests
import logging
import argparse
import urllib.request
from pathlib import Path
import os
import time
# import datetime
from datetime import datetime, timedelta

import pprint as pprint

# logging.config.fileConfig("logging.conf")
# logger = logging.getLogger(__name__)
logger = logging.getLogger('simple_example')

# TODO: These need to get moved to a secrets file (eventually) and then documented in the README
NOTION_TOKEN = "secret_64CliWn8EcxsVesfVkFK9ZRkgKvJzJJocBJbklhPbMw" # "YOUR_INTEGRATION_TOKEN"
DATABASE_ID = "16e0927aad754d5b996ca393d231ac08" # "YOUR_DATABASE_ID"
HOME = Path.home()
PATH_TO_HUGO = Path("/Users/ananya/Documents/aiea-lab.github.io/")
PHOTO_LOCATION = HOME.joinpath(PATH_TO_HUGO, "static/img/portraits/")

# content/intern
MEMBERS_LOCATION = HOME.joinpath(PATH_TO_HUGO, "content/member/")
ALUMNI_LOCATION = HOME.joinpath(PATH_TO_HUGO, "content/alumni/")
INTERN_LOCATION = HOME.joinpath(PATH_TO_HUGO, "content/intern/")
AUDITOR_LOCATION = HOME.joinpath(PATH_TO_HUGO, "content/auditor/")

headers = {
    "Authorization": "Bearer " + NOTION_TOKEN,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

def get_pages(num_pages=None, force=None, ignore=None):
    """
    If num_pages is None, get all pages, otherwise just the defined number.
    """
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"

    get_all = num_pages is None
    page_size = 300 if get_all else num_pages

    payload = {"page_size": page_size}
    response = requests.post(url, json=payload, headers=headers)

    data = response.json()

    # Comment this out to dump all data to a file
    # import json
    # with open('db.json', 'w', encoding='utf8') as f:
    #    json.dump(data, f, ensure_ascii=False, indent=4)
    updated = []

    results = data["results"]
    while data["has_more"] and get_all:
        payload = {"page_size": page_size, "start_cursor": data["next_cursor"]}
        url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()
        results.extend(data["results"])
    for item in results:
        if ignore and get_short_name(get_name(item)) in ignore:
            continue
        if make_member_page(item) or (force and get_short_name(get_name(item)) in force):
            logger.debug(f"Making a new page for {get_name(item)}")
            make_photo(item, PHOTO_LOCATION)
            write_member_to_file(item)
            updated.append(get_name(item))
    logger.info(f"Wrote {len(updated)} pages for {updated}")
    return results

def make_member_page(json):
    name = get_name(json)
    if name is None:
        return False
    short_name = get_short_name(name)

    # TODO: Check if last editted time is after the last time the file was written.
    role = get_role(json)
    if role == 'Intern':
        path = INTERN_LOCATION
    elif role == 'Alumni' or role == 'inactive' or role == 'on leave':
        path = ALUMNI_LOCATION
    elif role == 'Auditor':
        path = AUDITOR_LOCATION
    else:
        path = MEMBERS_LOCATION
    try:
        member_location = "%s/%s.md" % (path, short_name)
        member_file = Path(member_location)

        if notion_updated(json, member_file):
            return True
        else:
            logger.debug(f"Found an existing file for {short_name}")
            return False
    except FileNotFoundError: # Not found, so make a new page
        return True

    return True

# def get_status(json):
#     return ""

def write_member_to_file(json):
    """
    Writes {short_name}.md to a file in either the (1) member (if active) (2) intern (if an intern) (3) auditor
    (if an auditor) or (4) alumni.
    """
    header_text = get_header_information(json)
    social_text = make_social_information(json)
    name = get_name(json)
    short_name = get_short_name(name)

    # TODO: write to file in the right location
    role = get_role(json)
    if role == 'Intern':
        write_md(short_name, INTERN_LOCATION, header_text + "\n\n" + social_text)
    elif role == 'Alumni' or role == 'inactive':
        write_md(short_name, ALUMNI_LOCATION, header_text + "\n\n" + social_text)
    elif role == 'Auditor':
        write_md(short_name, AUDITOR_LOCATION, header_text + "\n\n" + social_text)
    else:
        write_md(short_name, MEMBERS_LOCATION, header_text+"\n\n"+social_text)

def write_md(name, location, text):
    f = open(str(location)+"/"+name+".md", "w")  # w for write
    f.write(text)
    f.close()

def get_level(json):
    try:
        level = json['properties']['Level']['multi_select'][0]['name']
        if level != "High School": # TODO: Add in collaborator
            level += " Student"
        else: level += " Intern"
    except IndexError:
        level = ""
    return level

def get_role(json):
    role = json['properties']['Status']['status']['name']
    return role

def get_name(json):
    """"
    Gets the name, returns None if no name is present and will not a make a members page.
    """
    try:
        return json['properties']['Name']['title'][0]['plain_text']
    except IndexError:
        return None
    except TypeError:
        return None

def get_short_name(full_name):
    """
    Adding an initial
    """
    # TODO: Add an initial
    try:
        last_initial = full_name.split()[1][0].lower()
        return full_name.split()[0].lower()+"_"+last_initial
    except IndexError:
        return full_name.split()[0].lower()
    except AttributeError:
        return

def get_interests(json):
    try:
        return [json['properties']['Interests']['multi_select'][i]['name']
                for i in range(len(json['properties']['Interests']['multi_select']))]
    except:
        return []

def get_short_bio(json):
    try:
        return json['properties']['Short Bio']['rich_text'][0]['text']['content']
    except TypeError:
        return ""
    except IndexError:
        return ""
    except KeyError:
        return ""

def get_bio(json):
    try:
        return json['properties']['Biography']['rich_text'][0]['text']['content']
    except TypeError:
        return ""
    except IndexError:
        return ""

def get_header_information(json, testing=False):
    name = get_name(json)
    short_name = get_short_name(name)
    date = datetime.today().strftime('%Y-%m-%d')
    interests = get_interests(json)
    bio = get_bio(json)
    short_bio = get_short_bio(json)

    img_location = "%s/%s.jpg" % (PHOTO_LOCATION, short_name)
    photo = short_name if Path(img_location).exists() else "default"

    # Markdown string
    markdown_string = '+++\n' \
    'bio = "%s" \n'\
    'date = "%s" \n'\
    'id = "%s" \n'\
    'interests = %s \n'\
    'name = "%s" \n'\
    'portrait = "/portraits/%s.jpg" \n'\
    'short_bio = "%s" \n'\
    'sort_position = 10\n ' \
    'short_name = "%s" '%(bio, date, short_name, interests, name, photo, short_bio, short_name)
    return markdown_string

def check_existing_md_file():
    """
    Check the existing markdown file, if it exists or if it hasn't be updated recently.
    """
    return


def make_hugo_compatible_md(path_to_template=""):
    """
    Check the last updated time and how it differs from the file time of the markdown
    """
    return

def make_photo(json, path):
    """
    Adds a photo to the path location.  Checks before to see if the image exists.  """
    short_name = get_short_name(get_name(json))
    img_location = "%s/%s.jpg" % (path, short_name)
    img_file = Path(img_location)

    if img_file.exists():
        logger.debug("%s exists, checking date"%img_file)

        # TODO: Check this date
        if not notion_updated(json, img_file):
            logger.debug(f"Recent photo found for {short_name}")
            return

    try:
        photo_url = json['cover']['file']['url']
        # logging.info("Retrieving photo from %s"%photo_url)  # TODO: Logging not working right now, will fix.
        # print("Retrieving %s photo from %s"%(short_name, photo_url))
        # print("Writing photo to %s"%path+"/"+short_name+".jpg")
        img_location = "%s/%s.jpg"%(path, short_name)
        urllib.request.urlretrieve(photo_url, img_location)
        # TODO: Read in previous photo if exists (check they are different).
    except KeyError:
        return
    except TypeError:
        return

def notion_updated(json, previous_file):
    """
    Checks whether the json was updated AFTER the last time the previous file was updated.

    Returns true if the notion was updated more recently, therefore we should make a new file
    """
    t = os.path.getmtime(previous_file)
    file_updated_object = datetime.fromtimestamp(t)

    # TODO: get the json date in a datetime format.
    last_edited_time = json['last_edited_time']  # I think this is in UTC
    notion_updated_object = datetime.strptime(last_edited_time, '%Y-%m-%dT%H:%M:%S.%fZ')  # I think this is in UTC
    notion_updated_pt = notion_updated_object - timedelta(hours=7, minutes=0)

    # Check if notion was recently updated, e.g., if notion updated > file updated
    if notion_updated_pt > file_updated_object:
        logger.debug("Notion recently updated, writing new file...")
        logger.debug("%s last modified: %s" % (previous_file, time.ctime(os.path.getmtime(previous_file))))
        logger.debug(f"Notion last editted in PT (I hope): {notion_updated_pt}")
        return True
    return False

def get_email(json):
    """
    Get email address from the json file
    """
    email = json["properties"]["Email"]["email"]
    if email:
        return email
    else:
        return ""

def get_twitter(json):
    return ""

def get_github(json):
    try:
        github_id = json["properties"]['github id']['rich_text'][0]['text']['content']
        return github_id
    except IndexError:
        return ""

def make_social_information(json):
    email = get_email(json)
    twitter = get_twitter(json)
    scholar = ''
    github = get_github(json)
    level = get_level(json)
    bio = get_bio(json)

    markdown_string = f'[[social]] \n' \
    f'    icon = "envelope" \n' \
    f'    icon_pack = "fa" \n' \
    f'    link = "mailto: {email}"\n\n ' \
    f'[[social]] \n' \
    f'    icon = "twitter" \n'\
    f'    icon_pack = "fa" \n'\
    f'    link = "{twitter}" \n\n'\
    f'[[social]] \n' \
    f'    icon = "google-scholar" \n' \
    f'    icon_pack = "ai" \n' \
    f'    link = "{scholar}" \n\n'\
    f'[[social]] \n' \
    f'    icon = "github" \n'\
    f'    icon_pack = "fa" \n' \
    f'    link = "https://github.com/{github}" \n' \
    f'[[organizations]] \n' \
    f'     name = "UC Santa Cruz" \n ' \
    f'     role = "{level}" \n' \
    '+++\n' \
    f'{bio}'
    # [[education]]
    #     course = "" \
    #     institution = "" \
    #     year = 2023 \
    # \
    return markdown_string

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", help="increase output verbosity", action="store_true")
    parser.add_argument("--force", help="Force updates for students with specific short names", nargs='+', default=None)
    parser.add_argument("--ignore", help="Ignores updates for members with specific short names", nargs='+', default=None)
    args = parser.parse_args()

    if args.verbose:
        logging.basicConfig()  # Add logging level here if you plan on using logging.info() instead of my_logger as below.

        #
        # logger.setLevel(logging.INFO)
        #
        # logger.info("Hi")
        logger = logging.getLogger('simple_example')
        logger.setLevel(logging.DEBUG)
        #
        # # # create console handler and set level to debug
        # ch = logging.StreamHandler()
        # ch.setLevel(logging.DEBUG)
        # #
        # # # # create formatter
        # formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        # # #
        # # add formatter to ch
        # ch.setFormatter(formatter)

        # # add ch to logger
        # logger.addHandler(ch)

    get_pages(force=args.force, ignore=args.ignore)

if __name__ == '__main__':
    main()
