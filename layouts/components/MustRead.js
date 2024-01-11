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
   const [firstR, setFirstR] = useState('');
 
   const [firstItemPost, setFirstItemPost] = useState('');

   useEffect(() => {
    fetch('/api/rss')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response as text
      })
      .then((xmlData) => {
        // Parse the XML data into JSON
        xml2js.parseString(xmlData, (err, result) => {
          if (err) {
            throw new Error('Error parsing XML');
          }

          // Extract the title of the first item
          const firstItem = result.rss.channel[0].item[0];
          const title = firstItem.title[0];

          // Set the title in the component state
          setFirstItemTitle(title);
          console.log('title:' + title, firstItemTitle);

        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      console.log('title5:', firstItemTitle);

      const MODEL_NAME = "gemini-pro";
      const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";
      
      async function run() {
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
            console.log('hi' + firstItemTitle)

        const parts = [
          {  text: `rewrite this title: ${firstItemTitle}`},
        ];
      
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });
      
        const response = result.response;
        console.log(response.text(), firstItemTitle);
      }
      console.log('hi' + firstItemTitle)
      
      run();
      
}, []);


async function addTweetHandler() {
  let formData = { biography: '', username: '', date: '' };
    formData.title = firstItemTitle;
    formData.date = new Date().toDateString();
 
    const response = await fetch('/api/new-tweet', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json'
      }
      })
    console.log(response, response.ok)
    if (!response.ok) {
        return error()
    }
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


export default MustRead;