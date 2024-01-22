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

const Author = ({ author, posts }) => {
  const { title } = config.site;
  return (
    <Base title={`${author} - ${title} `} >
      <div className="section">
        <div className="pt-3 md:px-6 lg:p-6 xl:px-24 px-4">
      <h1 className="text-black pl-3 text-3xl font-semibold uppercase">{author}</h1>
      </div>
          <LatestPostsContainer>
         <LatestTags items={posts} />
            </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default Author;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db();
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

  // Parse JSON data
  posts = JSON.parse(JSON.stringify(posts));

  // Get all authors
  const authors = posts.map(post => post.author);

  // Remove duplicates
  const uniqueAuthors = [...new Set(authors)];

  // Generate paths
  const paths = uniqueAuthors.map(author => ({
    params: { author: author.toString() },
  }));

  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db();
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

  // Parse JSON data
  posts = JSON.parse(JSON.stringify(posts));

  // Filter posts by author
  const filteredPosts = posts.filter(post => post.author === params.author);

  return {
    props: {
      posts: filteredPosts.reverse().slice(0, 15),
      author: params.author, 
  
    },
  };
}
