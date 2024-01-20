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

const Author = ({ author, posts }) => {
  
  return (
    <Base title={author}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{author}</span>{" "}
            category
          </h1>
          <LatestPostsContainer>
         <LatestTags items={posts} />
            </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default Author;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  
  const allAuthors = rweets.reduce((acc, tweet) => {
    const authors = tweet.authors; 
    return acc.concat(authors);
  }, []);
  const authors = [...new Set(allAuthors)];  
  client.close()

  const paths = authors.map((author) => ({ // change here
    params: {
      author: author,
    },
  }));

  return { paths, fallback: false };
};


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
      posts: filteredPosts,
    },
  };
}
