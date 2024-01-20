import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { q } = req.query;

    console.log('Search query:', q);

    const client = await MongoClient.connect(
      'mongodb+srv://alan:LSbsBY8HmkN1DoUg@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'
    );
    const db = client.db();
    const tweetsCollection = db.collection('tweets');

    let results;

    if (q) {
      results = await tweetsCollection
        .find({
          $or: [
            { text: { $regex: new RegExp(q, 'i') } },
            { user: { $regex: new RegExp(q, 'i') } },
          ],
        })
        .toArray();
    } else {
      results = await tweetsCollection.find().toArray();
    }

    console.log('Search results:', results);

    client.close();
    res.status(200).json(results);
  }
}

export default handler;