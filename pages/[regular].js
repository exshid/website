import { MongoClient, ObjectId } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link';
import Base from "@layouts/Baseof";

import {Fragment} from 'react'
function Tweet(props, relatedPosts ) {

  const myCats = JSON.parse(props.rweetData.cats);
  
const myTags = JSON.parse(props.rweetData.tags);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
let relatedPostsFiltered = props.relatedPosts.filter(obj => obj.cats.includes(myCats[0]));
console.log(relatedPostsFiltered)

if (relatedPostsFiltered.length < 3) {
  let relatedPostsCompleted = props.relatedPosts.filter(obj => !relatedPostsFiltered.includes(obj));
  relatedPostsFiltered = relatedPostsFiltered.concat(relatedPostsCompleted.slice(0, 3 - relatedPostsFiltered.length));
}

return <>
        <Base>
         <div id={props.rweetData.id} className="flex flex-col items-center divide-y">
         <div className="flex flex-col lg:flex-row py-5 p-2 w-full md:w-4/5 lg:w-[90%] xl:w-4/5">
<div className="w-full lg:w-1/2 flex flex-col justify-center p-3">
<div className="flex">      
{myCats.map((item, index) => (
  <Fragment key={index}>
<Link key={Math.random()} href={`/categories/${item}`}>
    <span className="text-pink-800 hover:underline text-lg uppercase w-max inline-block">{item}</span>
    </Link>
    {index !== myCats.length - 1 && <span className="mx-2">•</span>}
  </Fragment>
))}
</div>
            <h1 className="font-bold text-black text-4xl">{props.rweetData.title}</h1>
            <p className="text-lg py-3">{props.rweetData.description}</p>
  <div className="flex flex-row lg:flex-col">

    <Link key={Math.random()} href={`/authors/${props.rweetData.author}`}>
  <span className="text-lg uppercase font-bold text-black hover:underline hover:text-gray-500 inline-block lg:block w-max lg:w-full">
    By {props.rweetData.author}</span>
</Link>
  <span className="inline-block w-max lg:hidden	mx-2">•</span>
  <span className="text-lg w-max lg:w-full">{formatDate(props.rweetData.date)}</span>
            </div>
            </div>
        <div className="relative h-calc w-full lg:w-1/2 p-3">
        <Image
        src={props.rweetData.image} 
        alt={props.rweetData.image}
        layout="fill" 
        objectFit="cover"
      />

        </div>
            </div>
            <div className='content-text w-full px-2 md:w-4/5 lg:w-2/3 xl:w-1/2 text-black' dangerouslySetInnerHTML={{ __html: props.rweetData.content }}/>
            {myTags.length > 0 && <div className="flex space-x-4 px-3 pt-3 pb-2 w-full lg:w-4/5 items-center border-y">
                      <span className="mr-1 text-black font-bold">Tags:</span> 
                        {myTags.map((item) => {
                          return (
                          <Link key={Math.random()} href={`/tags/${item}`} className="text-xs font-medium text-gray-600 hover:text-gray-900">
                              {item}
                            </Link>
                            );
                         })}
              </div>}

<div className="w-full lg:w-4/5 flex flex-col items-center mb-6">
  <span className="text-3xl text-black pt-4 font-bold">Read More</span>

  <div className="flex divide-x w-full p-3 md:py-4 xl:px-6 2xl:px-20 overflow-y-hidden	overflow-x-scroll lg:overflow-x-hidden">

  {relatedPostsFiltered.slice(0, 3).map((post, index)  => (
          <div key={index} className="w-full md:w-1/3 p-4">

  <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="flex flex-col">
        <div className="h-72 w-80 relative">
        <Image
          className="h-full w-full object-cover relative"
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"/>
            </div>
          <div className="pt-8">
          <Link href={post._id}>
           <h3 className="text-lg font-bold hover:underline text-black hover:text-gray-500">
            {post.title}
          </h3>
          </Link >

              <p className="my-2 text-gray-500">{post.description}</p>
          <span className="mt-2 text-gray-700 hover:underline hover:text-black">By 
          <Link href={`authors/${post.author}`}>
          {post.author}
       </Link>
          </span>
        </div>
      </div>
    </div>
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
const allPosts = await tweetsCollection.find().toArray();

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
        relatedPosts: relatedPosts.reverse().slice(0, 15), 
    }
}
}
export default Tweet