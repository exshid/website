export default async function handler(req, res) {
    const rssUrl = 'https://www.theverge.com/rss/index.xml';
  
    try {
      const response = await fetch(rssUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.text(); 
  
      res.status(200).send(data); 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching the RSS data' });
    }
  }
  