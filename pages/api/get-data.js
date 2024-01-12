import { MongoClient } from 'mongodb'

async function handler(req, res) {

if (req.method === 'GET') {
    const client = await MongoClient.connect('mongodb+srv://alan:LSbsBY8HmkN1DoUg@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
    const db = client.db()
    const tweetsCollection = db.collection('rweets')
    const result = await tweetsCollection.find().toArray()
    client.close()
    res.status(200).json(result)
}
}
export default handler;
