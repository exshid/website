import fs from 'fs';
import path from 'path';

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

// category page
const Search = ({ search, posts }) => {
  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <Base title={search}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{search}</span>{" "}
            search
          </h1>
          <LatestPostsContainer>
         <LatestTags items={posts} />
            </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default Search;

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('pages/search'));

    // Remove ".js" from file names to get the paths
    const paths = files.map(filename => ({
      params: {
        search: filename.replace('.js', '')
      }
    }));
  
    return {
      paths,
      fallback: false // See the "fallback" section below for more details
    };
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
    

  return {
    props: { 
      posts: posts, 
      search: params.search, 
    },
  };
};
