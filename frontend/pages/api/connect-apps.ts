import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;

  // Simulate connecting Notion to Hugo
  if (query.toLowerCase().includes('notion') && query.toLowerCase().includes('hugo')) {
    return res.status(200).json({
      success: true,
      message: 'Connecting Notion to Hugo...',
      applications: ['Notion', 'Hugo', 'Zapier'], // Relevant applications
    });
  }

  // For other queries
  return res.status(200).json({
    success: false,
    message: 'No relevant applications found for your query.',
    applications: [],
  });
}
