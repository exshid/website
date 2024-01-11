// pages/api/rss.js

export default async function handler(req, res) {
    const rssUrl = 'http://feeds.feedburner.com/ign/all';
  
    try {
      const response = await fetch(rssUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.text(); // Parse the response as text
  
      res.status(200).send(data); // Return the data as a response
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching the RSS data' });
    }
  }
  