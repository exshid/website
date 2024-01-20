import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(
      'mongodb+srv://alan:LSbsBY8HmkN1DoUg@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'
    );
    const db = client.db();
    const tweetsCollection = db.collection('tweets');

    const { q } = req.query;
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

    client.close();
    res.status(200).json(results);
  }
}

export default handler;