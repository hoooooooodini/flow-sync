// /pages/api/apps.js

export default function handler(req, res) {
    const apps = [
      { id: 1, name: 'Slack', image: '/images/slack.png' },
      { id: 2, name: 'Google Drive', image: '/images/google-drive.png' },
      { id: 3, name: 'Zoom', image: '/images/zoom.png' },
      { id: 4, name: 'Dropbox', image: '/images/dropbox.png' },
      { id: 5, name: 'Trello', image: '/images/trello.png' },
      { id: 6, name: 'Asana', image: '/images/asana.png' },
      { id: 7, name: 'Notion', image: '/images/notion.png' },
      { id: 8, name: 'GitHub', image: '/images/github.png' }
    ];
    res.status(200).json(apps);
  }
  