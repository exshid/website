import { MongoClient, ObjectId } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link';
import Base from "@layouts/Baseof";

import {Fragment} from 'react'
function Tweet(props, relatedPosts ) {

  const myCats = JSON.parse(props.rweetData.cats);
  let relatedPostsFiltered = props.relatedPosts.filter(obj => obj.cats.includes(myCats[0]));
  
  if (relatedPostsFiltered.length < 3) {
    let relatedPostsCompleted = props.relatedPosts.filter(obj => !relatedPostsFiltered.includes(obj));
    relatedPostsFiltered = relatedPostsFiltered.concat(relatedPostsCompleted.slice(0, 3 - relatedPostsFiltered.length));
  }
    console.log(relatedPostsFiltered);

const myTags = JSON.parse(props.rweetData.tags);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
    return <>
        <Base>
         <div id={props.rweetData.id} className="flex flex-col items-center divide-y">
         <div className="flex flex-row py-5 w-4/5">
<div className="w-1/2 flex flex-col justify-center p-3">
<div className="flex">      
{myCats.map((item, index) => (
  <Fragment key={index}>
    <span className="text-pink-800 text-lg uppercase w-min inline-block">{item}</span>
    {index !== myCats.length - 1 && <span>•</span>}
  </Fragment>
))}
</div>
            <h1 className="font-bold text-black text-4xl">{props.rweetData.title}</h1>
            <p className="text-lg py-3">{props.rweetData.description}</p>

  <span className="text-lg uppercase font-bold text-black">By {props.rweetData.author}</span>
  <span className="text-lg">{formatDate(props.rweetData.date)}</span>
            </div>
        <div className="relative h-calc w-1/2 p-3">
        <Image
        src={props.rweetData.image} 
        alt={props.rweetData.image}
        layout="fill" 
        objectFit="cover"
      />

        </div>
            </div>
            <div className='content-text w-1/2 mt-6 text-black' dangerouslySetInnerHTML={{ __html: props.rweetData.content }}/>
        
            {myTags && <div className="flex space-x-4 px-80 py-3 w-4/5 items-center border-y"><span className="mr-1">Tags:</span> 
        {myTags.map((item) => {
          const href = item.toLowerCase().split(' ').join('-');
          return (
            <Link key={Math.random()} href={`/tags/${href}`} className="text-xs font-medium text-gray-600 hover:text-gray-900">
              {item}
            </Link>
          );
        })}
      </div>
      }
<div className="w-4/5 flex flex-col items-center mb-6">
  <span className="text-3xl text-black p-3 font-bold">Read More</span>
      <div className="flex justify-around w-full">
  {relatedPostsFiltered.slice(0, 3).map((post, index)  => (
    <div key={index} className="flex flex-col w-96">
     <div className="h-64 p-3">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover mb-2"/>
   </div>
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-700 mb-2">{post.description}</p>
      <span className="text-sm text-black">By {post.author}</span>
    </div>
  ))}
</div>
</div>

        </div>
        </Base>

        </>
}
export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');

  const rweets = await tweetsCollection.find({}, {
      _id: 1,
      url: 1  // Fetch the 'url' field
  }).toArray()
  client.close()
  return {
      fallback: 'blocking',
      paths: rweets.map(rweet => ({
          params: {
            regular: rweet.url  // Use 'url' instead of '_id'
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

  // Fetch all posts
  const allPosts = await tweetsCollection.find().toArray();

  // Filter out the current post and parse the JSON array
  const relatedPosts = allPosts.filter(post => post._id.toString() !== tweetId).map(post => JSON.parse(JSON.stringify(post)));

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
          },
          relatedPosts: relatedPosts.reverse().slice(0, 15), // Add relatedPosts to props
      }
  }
}
export default Tweet

