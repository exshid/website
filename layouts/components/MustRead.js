import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

const MustRead = ({ articles }) => {

  const categoriesPost = [
    "Games", 
    "Movies",
    "TV Shows",
    "Music",
    "Books",
    "Artificial Intelligence", 
    "Virtual Reality",
    "Animation",
    "Anime",
    "Comics",
    "Celebrities",
    "Award Shows"
  ];
  
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


  const [firstItemTitle, setFirstItemTitle] = useState();
  const [firstItemPost, setFirstItemPost] = useState();
  const [firstTags, setFirstTags] = useState();
  const [firstCats, setFirstCats] = useState();
  const [firstURL, setFirstURL] = useState();
  const [firstIntro, setFirstIntro] = useState();
  const [firstImageURL, setFirstImageURL] = useState();
  const [oldTitle, setOldTitle] = useState();

  async function postSenderHandler() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
    const paddedHour = hour.toString().padStart(2, "0");
    const paddedMinute = minute.toString().padStart(2, "0");
    
    const dateString = `${year}-${paddedMonth}-${paddedDay}`;
    const timeString = `${paddedHour}:${paddedMinute}`;
    const names = ['John Williams', 'Jennifer Brown', 'Bob Smith', 'Mary Robert', 'Tom Johnson'];

    const randomName = names[Math.floor(Math.random() * names.length)];
  
    let postData = {author: randomName, description: firstIntro,title: firstItemTitle, content: firstItemPost, tags: firstTags, cats: firstCats,  url: firstURL, image:firstImageURL, date: dateString, time: timeString};
      
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
    }
    async function postGet() {

    const responseGet = await fetch('/api/get-data', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  
  if (responseGet.ok) {
      const data5 = await responseGet.json();
      setOldTitle(data5[data5.length - 1].image);

  } else {
      console.log('Error:', responseGet.status, responseGet.statusText);
  }
}
  useEffect(() => {
    postGet()
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

        const title = firstItem.title[0];
        const intro = firstItem.description[0];
        const postDescription = firstItem["content:encoded"][0];
        const imageUrl = firstItem["media:content"][0]["$"]["url"];
        
        setFirstImageURL(imageUrl);
        console.log('g', oldTitle, firstImageURL);
        if (oldTitle && firstImageURL) {

        if (oldTitle !== firstImageURL) {

        run(title);
        runPost(postDescription);
        runTags(title);
        runCats(title);
        runDescription(intro);
        runURL(title);
        } else{
          console.log('Post exists');

        }
      }
      });
    };

    const MODEL_NAME = "gemini-pro";
    const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";
    const run = async (title) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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

    
    const runDescription = async (intro) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const parts = [
        { text: `sir, rewrite this post intro with a publish-ready quality: ${runDescription}. do it only once, and send nothing other than the rewritten post intro.` }
      ];
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      setFirstIntro(response.text());
    };


    const runPost = async (postDescription) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const parts = [
        { text: `sir, you are a professional writer. rewrite this post in a publish-ready quality. if there is any quotes, do not change it any way. separate pargaraphs using HTML <p> tags, and if there is any trace of mention another website, remove it: ${postDescription}` }
  
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
   
      const parts = [
        { text: `out of the categories in the array ${categoriesPost}, what would be proper categories for a news article with this title? ${title}; write them in this format: ["diy", "toy"]` }
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

  }, [oldTitle, firstImageURL]);

  useEffect(() => {
    console.log('title: ', firstItemTitle, 'content: ',
     firstItemPost, 'tags: ', firstTags, 'cats: ', firstCats, 'url: ', firstURL, 'image: ', firstImageURL
    );
    if (firstItemTitle && firstItemPost && firstTags && firstCats && firstURL && firstImageURL && firstIntro && oldTitle !== firstImageURL) {
    
      postSenderHandler()
      console.log('done');
  }
    
}, [firstItemTitle, firstItemPost, firstTags, firstCats, firstURL, firstImageURL,firstIntro, oldTitle]);


  return (
<div className="flex flex-wrap divide-x px-20">
                  {articles.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};


const ArticleCard = ({ image, title, description, author }) => {
  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="flex flex-col">
        <div className="h-72 w-full">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={title}
        />
        </div>
        <div className="py-8">
          <div className="text-lg font-bold text-black">
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