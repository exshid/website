import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://alan:LSbsBY8HmkN1DoUg@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
        const db = client.db()
        const tweetsCollection = db.collection('rweets')
        const result = await tweetsCollection.insertOne(data)
        console.log(result)
        client.close()
        res.status(201).json({ message: 'Rweet sent!' })
    }
}

export default handler;