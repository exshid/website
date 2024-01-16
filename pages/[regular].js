import { MongoClient, ObjectId } from 'mongodb'
import Image from 'next/image'


function Tweet(props) {
const array = ["Movies", "News"];
const myArray = JSON.parse(props.rweetData.cats);

    return <>
         <div id={props.rweetData.id}>
         <div className="flex flex-row">
<div className="w-1/2 flex flex-col">        
          <span className="text-pink-800">{myArray} {array}</span>
            <h1 className="font-bold p-3 text-black text-4xl">{props.rweetData.title}</h1>
            </div>
        <div className="relative h-[calc(100vh - 108px)] w-1/2">
        <Image
        src={props.rweetData.image} 
        alt={props.rweetData.image}
        layout="fill" 
        objectFit="cover"
      />

        </div>
            </div>
            <div className='content-text w-1/2' dangerouslySetInnerHTML={{ __html: props.rweetData.content }}/>
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

