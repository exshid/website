/*const fs = require('fs');
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

let firstItemTitle ='';
let firstItemPost= '';
let run;
let runPost;

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
      firstItemTitle = title;
      run(title);
      runPost(postDescription);

    });
  };
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";
  
  console.log(lastTitle);

  if (lastTitle !== firstItemTitle) {

   run = async (title) => {
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
    firstItemTitle = response.text();


  };

   runPost = async (postDescription) => {
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
    firstItemPost = response.text();
  };

    fetchData().catch((error) => {
    console.error('Error:', error);
  });
}


import { existsSync, writeFileSync } from 'fs';

export default function handler(req, res) {
  // Define the path and content of the new file
  const filePath = './newFile.js';
  const content = 'let variable1 = "Hello";\nlet variable2 = "World";\n';

  // Check if the file already exists
  if (!existsSync(filePath)) {
    // Create the new file with the specified content
    writeFileSync(filePath, content);
    res.status(200).json({ message: 'File created successfully' });
  } else {
    res.status(400).json({ message: 'File already exists' });
  }
}
*/



// Import the required modules
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import fs from 'fs';

// Create an async function for your API route
export default async function handler(req, res) {
  try {
    // Fetch the RSS feed
    const response = await fetch('/api/rss');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the XML data
    const xmlData = await response.text();
    let jsonData;
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        throw new Error('Error parsing XML');
      }
      jsonData = result;
    });

    // Extract the first item and its details
    const firstItem = jsonData.rss.channel[0].item[0];
    const title = firstItem.title[0];
    const postDescription = firstItem.description[0];

    // Save the data to a new JavaScript file
    const data = `export const fetchedData = [${JSON.stringify({ title, postDescription })}];\n`;
    fs.writeFile('fetchedData.js', data, (err) => {
      if (err) {
        throw new Error('Error writing file');
      }
    });

    // Return the data as JSON
    res.status(200).json({ title, postDescription });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
}
