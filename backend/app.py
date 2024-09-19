from flask import Flask, request, jsonify
import requests
import logging
import os
from datetime import datetime, timedelta
from pathlib import Path

app = Flask(__name__)

NOTION_TOKEN = "secret_64CliWn8EcxsVesfVkFK9ZRkgKvJzJJocBJbklhPbMw"
DATABASE_ID = "16e0927aad754d5b996ca393d231ac08"


# Notion API headers
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

@app.route('/submit-url', methods=['POST'])
def submit_url():
    # Get the Notion database URL from the frontend
    notion_url = request.json.get('url')

    if not notion_url:
        return jsonify({"error": "Notion URL is missing"}), 400

    # Fetch pages from the Notion API
    response = get_pages(notion_url)

    if response:
        return jsonify({"message": "Pages fetched and processed successfully"}), 200
    else:
        return jsonify({"error": "Failed to process the Notion URL"}), 500

def get_pages(notion_url):
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    payload = {"page_size": 10}
    response = requests.post(url, json=payload, headers=headers)

    # Your existing logic to process the response
    if response.status_code == 200:
        data = response.json()
        # Process the Notion data as per your current logic
        return True
    else:
        logging.error("Failed to fetch data from Notion")
        return False

if __name__ == "__main__":
    app.run(debug=True)
