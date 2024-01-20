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
import LatestTags from "@layouts/components/LatestTags";

const Tag = ({ tag, posts }) => {
  
  return (
    <Base title={tag}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{tag}</span>{" "}
            category
          </h1>
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

    posts = posts.reverse().slice(0, 20).map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
  const filteredPost = posts.filter(item => {
    const tagsArray = JSON.parse(item.tags).map(tag => tag.toLowerCase()); 
    return tagsArray.includes(params.tag.toLowerCase()); 
  });
    

  return {
    props: { 
      posts: filteredPost, 
      tag: params.tag, 
    },
  };
};