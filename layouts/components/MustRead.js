import React, { useEffect, useState } from 'react';
import { lastTitle } from "@layouts/components/title.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

const MustRead = ({ articles }) => {
  const [firstItemTitle, setFirstItemTitle] = useState('');
  const [firstItemPost, setFirstItemPost] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/rss');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const xmlData = await response.text();
  
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          throw new Error('Error parsing XML');
        }
        const firstItem = result.rss.channel[0].item[0];

        console.log('first:', JSON.stringify(firstItem, null, 2));

        const title = firstItem.title[0];
        const postDescription = firstItem.description[0];
        console.log('first: ', postDescription);
  
        run(title);
        runPost(postDescription);

      });
    };
    const MODEL_NAME = "gemini-pro";
    const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";
    
    console.log(lastTitle);

    if (lastTitle !== title) {

    const run = async (title) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const generationConfig = {
        temperature: 0.8,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
  
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
  
      const parts = [
        { text: `rewrite this title: ${title}` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      console.log(response.text(), ' and ', title);
      setFirstItemTitle(response.text());
  
      fetch(`/api/rss?title=${title}`) 
  .then((res) => res.json()) // parse the response as JSON
  .then((data) => console.log(data.message)); // log the message from the response

    };
  
    const runPost = async (postDescription) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const generationConfig = {
        temperature: 0.8,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
  
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
  
      const parts = [
        { text: `rewrite this post in a professional way. if there is any quotes, do not change it any way: ${postDescription}` }
      
      ];
        const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
        const response = result.response;
      console.log(response.text(), ' and ', postDescription);
      setFirstItemPost(response.text());
    };

      fetchData().catch((error) => {
      console.error('Error:', error);
    });
  }}, []);
    return (
    <div className="flex flex-wrap">
              <p className="rss-item-content">{firstItemTitle}</p>
              <p className="rss-item-content">{firstItemPost}</p>
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

export default MustRead;