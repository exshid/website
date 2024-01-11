import React, { useEffect, useState } from 'react';
import { lastTitle } from "@layouts/components/title.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

const MustRead = ({ articles }) => {
  async function addTweetHandler(formData) {
    console.log(formData)
    formData.biography = `This user's name is ${session.user.name}`
    formData.username = session.user.name.replace(/ /g, '').toLowerCase()
    formData.name = session.user.name
    formData.date = new Date().toDateString();
    formData.avatar = session.user.image;

    const response = await fetch('/api/new-tweet', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response, response.ok)
    router.replace(router.asPath)
    form.resetFields()
    if (!response.ok) {
        return error()
    }
    success()
}

  return (
    <div className="flex flex-wrap">
      <button onClick={addTweetHandler}>Click</button>
                  {articles.map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};


const ArticleCard = ({ image, title, description, author }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex">
        <img
          className="h-48 w-full object-cover md:w-48"
          src={image}
          alt={title}
        />
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
              <p className="mt-2 text-gray-500">{description}</p>
          <p className="mt-2 text-gray-700">By {author}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  client.close()
  return {
    props: {
      loadedTweets: [...rweets].reverse().map(rweet => ({
        name: rweet.name,
        username: rweet.username,
        tweet: rweet.tweet,
        biography: rweet.biography,
        date: rweet.date,
        id: rweet._id.toString(),
        avatar: rweet.avatar
      }))
    },
    revalidate: 1
  }
}
export default MustRead;