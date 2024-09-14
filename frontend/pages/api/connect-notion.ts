// pages/api/connect-notion.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_KG04M8WT3I4001RAxHIWoCmFQ3FXWaGpp6hhMGrem93',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { notionUrl } = req.body;

  if (!notionUrl) {
    return res.status(400).json({ success: false, message: 'Notion Database URL is missing' });
  }

  try {
    // Extract the database ID from the URL
    const databaseId = "7f2f30acb49a489f86967851fb4fc2b5";
    
    // Log the database ID to the console
    console.log('Extracted Database ID:', databaseId);

    // Query the Notion database using the database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    if (response) {
      res.status(200).json({ success: true, message: 'Successfully connected to Notion Database!' });
    } else {
      res.status(500).json({ success: false, message: 'Could not connect to Notion Database.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error connecting to Notion Database.' });
  }
}
