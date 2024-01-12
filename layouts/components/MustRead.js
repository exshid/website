import React, { useEffect, useState } from 'react';
import { lastTitle } from "@layouts/components/title.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

const MustRead = ({ articles }) => {
  const [firstItemTitle, setFirstItemTitle] = useState();
  const [firstItemPost, setFirstItemPost] = useState();
  const [firstTags, setFirstTags] = useState();
  const [firstCats, setFirstCats] = useState();
  const [firstURL, setFirstURL] = useState();
  const [firstImageURL, setFirstImageURL] = useState();

  async function postSenderHandler() {
  const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const paddedMonth = month.toString().padStart(2, "0");
const paddedDay = day.toString().padStart(2, "0");
const dateString = `${year}-${paddedMonth}-${paddedDay}`;

    let postData = { title: firstItemTitle, content: firstItemPost, tags: firstTags, cats: firstCats,
    url: firstURL, image:firstImageURL, date: dateString};
      
      const response = await fetch('/api/new-tweet', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
        })
      console.log(response, response.ok)
      if (!response.ok) {
          return error()
      }
     
      const responseGet = await fetch('/api/new-tweet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (responseGet.ok) {
        const data5 = await responseGet.json();
        console.log(data5);
    } else {
        console.log('Error:', responseGet.status, responseGet.statusText);
    }
    
      
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/rss');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const xmlData = await response.text(); // Parse the response as text
  
      // Parse the XML data into JSON
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          throw new Error('Error parsing XML');
        }
  
        // Extract the title of the first item
        const firstItem = result.rss.channel[0].item[0];

        const title = firstItem.title[0];
        const postDescription = firstItem["content:encoded"][0];
        const imageUrl = firstItem["media:content"][0]["$"]["url"];
        
        setFirstImageURL(imageUrl);

        // Set the title in the component state
  
        // Call the run function after setting the title
        run(title);
        runPost(postDescription);
        runTags(title);
        runCats(title);
        runURL(title);


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
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  
      const parts = [
        { text: `sir, rewrite this title with a publish-ready quality: ${title}. do it only once, and send nothing other than the rewritten title.` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
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
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  
      const parts = [
        { text: `sir, you are a professional writer. rewrite this post in a publish-ready quality. if there is any quotes, do not change it any way. separate pargaraphs using HTML <p> tags: ${postDescription}` }
  
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      setFirstItemPost(response.text());
    };
    
    const runTags = async (title) => {
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
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  
      const parts = [
        { text: `what people, games, films, tv shows, companies, etc are mentioned in this title? ${title}; write them as tags in this format: ["diy", "toy"]` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      setFirstTags(response.text());
    };

    const runCats = async (title) => {
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
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  
      const parts = [
        { text: `what would be proper categories for a news article with this title? ${title}; write them in this format: ["diy", "toy"]` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      setFirstCats(response.text());
    };
    const runURL = async (title) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const generationConfig = {
        temperature: 0.8,
        topK: 1,
        topP: 1,
        maxOutputTokens: 20,
      };
  
      
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  
      const parts = [
        { text: `what would be proper url PermaLink for a news article with this title? ${title}; write it all in lowercase and write - instead of space.` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      setFirstURL(response.text());
    };


    fetchData().catch((error) => {
      console.error('Error:', error);
    });

  }, []);

  useEffect(() => {
    if (firstItemTitle && firstItemPost && firstTags && firstCats && firstURL && firstImageURL) {
      console.log('title: ', firstItemTitle, 'content: ', firstItemPost, 'tags: ', firstTags, 'cats: ', firstCats, 'url: ', firstURL, 'image: ', firstImageURL
      );
      postSenderHandler()
    }     
  
  }, [firstItemTitle, firstItemPost, firstTags, firstCats, firstURL, firstImageURL]);

  return (
    <div className="flex flex-wrap">
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