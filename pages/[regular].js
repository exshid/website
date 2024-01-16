import { MongoClient, ObjectId } from 'mongodb'


function Tweet(props) {

    return <>
         <div>
            <p>{props.rweetData.title}</p>

            <p className='tweet-text'>{props.rweetData.content}</p>
        </div>
        </>
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
    const db = client.db()
    const tweetsCollection = db.collection('rweets');

    const rweets = await tweetsCollection.find({}, {
        _id: 1,
    }).toArray()
    client.close()
    return {
        fallback: 'blocking',
        paths: rweets.map(rweet => ({
            params: {
              regular: rweet._id.toString()
            },
        }))
    }
}


export async function getStaticProps(context) {
  const tweetId = context.params.regular;

  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')

  const db = client.db()

  const tweetsCollection = db.collection('rweets');

  const rweet = await tweetsCollection.findOne({ _id: new ObjectId(tweetId) })

  client.close()
  return {
      props: {
          rweetData: {
            title: rweet.title,
            content: rweet.content,
            description: rweet.description,
            url: rweet.url,
            tags: rweet.tags,
            cats: rweet.cats,
            date: rweet.date,
            id: rweet._id.toString(),
            author: rweet.author,
            image: rweet.image
}
      }
  }


}
export default Tweet

