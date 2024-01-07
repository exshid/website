import { lastTitle } from "@layouts/components/title.js";

export default function handler(req, res) {
    const title = req.query.firstItemTitle; // get the title from the query parameter
    res.status(200).json({ message: `Hello, ${title}!` }); // send a response with the name
    console.log('from rss ', title)
  
    try {
 
      // Modify the lastTitle array directly
      lastTitle[0].title = title;
  
      res.status(200).json({ message: 'Title updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating title' });
    }
  }