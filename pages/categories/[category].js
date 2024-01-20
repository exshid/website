import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;
import { MongoClient } from 'mongodb'
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestPosts from "@layouts/components/LatestPosts";

// category page
const Category = ({ category, posts }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
  const handleResize = () => {
  setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => {
  window.removeEventListener('resize', handleResize);
  };
  }, []); 
  console.log( category, posts )
  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <Base title={category}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{category}</span>{" "}
            category
          </h1>
         <LatestPostsContainer>
    <div className="w-full xl:px-20 divide-y p-3">
      {posts.map((item) => (
  <>
  {windowWidth > 1024 ? (

<div key={item.id} className="flex">
<Image src={item.image} alt={item.title}
            className="object-cover !relative lg:pr-4 lg:py-3 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 first:lg:w-[500px] first:lg:h-[400px] rounded-m"
                    objectFit="cover"/>
 <div>
 <Link href={`/${item._id}`}>

            <h3 className="font-semibold transition hover:underline text-lg md:text-xl lg:text-3xl first:lg:text-4xl pt-2">{item.title}</h3>
</Link>
            <p className="py-2 text-black first:text-lg">{item.description}</p>
              <p className="font-bold text-black first:text-lg">{item.author}</p>
      </div>      
          </div>
     
     ) : (
      <div key={Math.random()} className="flex flex-col">
         <Link href={`/${item._id}`}>

        <h3 className="font-semibold transition hover:underline text-lg md:text-xl lg:text-3xl pt-2">{item.title}</h3>
</Link>
          <div className="flex flex-row-reverse justify-between">
      <Image src={item.image} alt={item.title}
      className="object-cover !relative lg:p-4 ml-2 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"
       objectFit="cover"/>
       <div>
       <p className="py-2 text-black">
     {item.description.length > 81 
       ? `${item.description.substring(0, 81)}...` 
       : item.description}
         </p>
      <div>
        <span className="font-bold text-black pb-2">{item.author}</span>
      </div>
      </div>
      </div>
    </div> )}
</>
      ))}
  </div>
    </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default Category;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  
  const allCategories = rweets.reduce((acc, tweet) => {
    const cats = JSON.parse(tweet.cats); // Parse the JSON string into a JavaScript array
    return acc.concat(cats);
  }, []);
  const categories = [...new Set(allCategories)]; // Extract unique categories
  
  client.close()

  const paths = allCategories.map((category) => ({
    params: {
      category: category,
    },
  }));

  return { paths, fallback: false };
};


export async function getStaticProps({ params }) {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db() 
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

    posts = posts.reverse().slice(0, 20).map(post => ({
    ...post,
    _id: post._id.toString(),
  }));

  const filteredPost = posts.filter(item => {
      const catsArray = JSON.parse(item.cats);
      return catsArray.includes(params.category.toLowerCase());
  });
  

  return {
    props: { 
      posts: filteredPost, 
      category: params.category, 
      raw: posts,
    },
  };
};
