import { MongoClient } from 'mongodb'

async function setup(req, res) {
    if (req.method === 'POST') {
        const client = await MongoClient.connect('mongodb+srv://alan:LSbsBY8HmkN1DoUg@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
        const db = client.db()
        const tweetsCollection = db.collection('rweets')

        // Create text index on the 'title' and 'content' fields
        await tweetsCollection.createIndex({ title: 'text', content: 'text' })

        client.close()
        res.status(200).send('Index created successfully')
    }
}

export default setup
