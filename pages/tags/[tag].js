import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { MongoClient } from 'mongodb'
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";

const Tag = ({ tag, posts }) => {
  const { title } = config.site;

  return (
    <Base title={`${tag} - ${title} `} >
      <div className="section">
      <div className="pt-3 md:px-6 lg:p-6 xl:px-20 px-4">
      <h1 className="text-black xl:px-20 px-4 py-3 text-3xl font-semibold italic uppercase">{tag}</h1>
      </div>
          <LatestPostsContainer>
         <LatestTags items={posts} />
            </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default Tag;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  
  const allTags = rweets.reduce((acc, tweet) => {
    const tags = JSON.parse(tweet.tags); 
    return acc.concat(tags);
  }, []);
  const tags = [...new Set(allTags)];  
  client.close()

  const paths = allTags.map((tag) => ({
    params: {
      tag: tag,
    },
  }));

  return { paths, fallback: false };
};


export async function getStaticProps({ params }) {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db() 
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

    posts = posts.reverse().map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
  const filteredPost = posts.filter(item => {
    const tagsArray = JSON.parse(item.tags).map(tag => tag.toLowerCase()); 
    return tagsArray.includes(params.tag.toLowerCase()); 
  });
    

  return {
    props: { 
      posts: filteredPost.slice(0, 20), 
      tag: params.tag, 
    },
  };
};