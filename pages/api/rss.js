import xml2js from 'xml2js';
import React, { useEffect, useState } from 'react';
import {
GoogleGenerativeAI,
HarmCategory,
HarmBlockThreshold,
} from "@google/generative-ai";

export default async function handler(req, res) {
    const rssUrl = 'https://www.gamespot.com/feeds/news';
  
    try {
      const response = await fetch(rssUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.text(); // Parse the response as text
  
      res.status(200).send(data); // Return the data as a response
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching the RSS data' });
    }
  }

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

}, []);
