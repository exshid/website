export default function handler(req, res) {
    const title = req.query.firstItemTitle; // get the title from the query parameter
    res.status(200).json({ message: `Hello, ${title}!` }); // send a response with the name
    console.log('from rss ', title)
  }
  