import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { MongoClient } from "mongodb";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";

const Category = ({ category, posts }) => {
  const { title } = config.site;

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <Base title={`${category} - ${title} `}>
      <div className="section">
        <div className="pt-3 md:px-6 lg:p-6 xl:px-20 px-4">
          <h1 className="text-black xl:px-20 px-4 py-3 text-3xl font-semibold italic uppercase">
            {category}
          </h1>
        </div>
        <LatestPostsContainer>
          <LatestTags items={posts} />
        </LatestPostsContainer>
      </div>
    </Base>
  );
};

export default Category;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority"
  );
  const db = client.db();
  const tweetsCollection = db.collection("rweets");
  const rweets = await tweetsCollection.find().toArray();

  const allCategories = rweets.reduce((acc, tweet) => {
    const cats = JSON.parse(tweet.cats); 
    return acc.concat(cats);
  }, []);
  const categories = [...new Set(allCategories)]; 

  client.close();

  const paths = allCategories.map((category) => ({
    params: {
      category: category,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = await MongoClient.connect(
    "mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority"
  );
  const db = client.db();
  const tweetsCollection = db.collection("rweets");
  let posts = await tweetsCollection.find().toArray();

  posts = posts.reverse().map((post) => ({
    ...post,
    _id: post._id.toString(),
  }));
  const filteredPost = posts.filter((item) => {
    const catsArray = JSON.parse(item.cats).map((cat) => cat.toLowerCase());
    return catsArray.includes(params.category.toLowerCase());
  });

  return {
    props: {
      posts: filteredPost.slice(0, 20),
      category: params.category,
    },
  };
}
