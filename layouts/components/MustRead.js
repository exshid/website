import React, { useEffect, useState } from 'react';
import { lastTitle } from "@layouts/components/title.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

const MustRead = ({ articles }) => {
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
  const [firstImageURL, setFirstImageURL] = useState();
  const [oldTitle, setOldTitle] = useState();

  async function postSenderHandler() {
  const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const paddedMonth = month.toString().padStart(2, "0");
const paddedDay = day.toString().padStart(2, "0");
const dateString = `${year}-${paddedMonth}-${paddedDay}`;

    let postData = { title: firstItemTitle, content: firstItemPost, tags: firstTags, cats: firstCats,  url: firstURL, image:firstImageURL, date: dateString};
      
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
      console.log(oldTitle);

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
        const postDescription = firstItem["content:encoded"][0];
        const imageUrl = firstItem["media:content"][0]["$"]["url"];
        
        setFirstImageURL(imageUrl);
        if (oldTitle !== firstImageURL) {

        run(title);
        runPost(postDescription);
        runTags(title);
        runCats(title);
        runURL(title);
        }

      });
    };

    const MODEL_NAME = "gemini-pro";
    const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";
    
    if (oldTitle !== firstImageURL) {

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
  
    const runPost = async (postDescription) => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
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
  }else {
    console.log('post already exists');
}

    fetchData().catch((error) => {
      console.error('Error:', error);
    });

  }, []);

  useEffect(() => {
    console.log('title: ', firstItemTitle, 'content: ',
     firstItemPost, 'tags: ', firstTags, 'cats: ', firstCats, 'url: ', firstURL, 'image: ', firstImageURL
    );
    
    if (firstItemTitle && firstItemPost && firstTags && firstCats && firstURL && firstImageURL) {
      postSenderHandler()
      console.log('done');
  }

}, [firstItemTitle, firstItemPost, firstTags, firstCats, firstURL, firstImageURL]);


  return (
<>
<div className="flex flex-wrap divide-x px-6">
                  {articles.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
    <div className="flex flex-wrap justify-between p-4 bg-gray-800 text-white">
  <h2 className="w-full text-2xl font-bold mb-4">PODCASTS</h2>
  {articles.slice(0, 4).map((podcast) => (
    <div key={podcast.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className="bg-gray-700 p-4 rounded-lg">
        <img src={podcast.image} alt={podcast.title} className="w-full h-32 object-cover rounded-lg mb-2"/>
        <h3 className="text-lg font-bold mb-1">{podcast.title}</h3>
        <p className="text-sm">{podcast.description}</p>
        <p className="text-xs text-gray-400 mt-2">{podcast.author}</p>
      </div>
    </div>
  ))}
</div>
<div className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-2">THE IOWA CAUCUSES</h2>
  
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold">The G.O.P primary will kick off on Monday with Trump as the front-runner and Haley and DeSantis vying for second place.</h3>
    </div>
    
    <div>
      <img src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="Article Image" className="w-full object-cover h-32 rounded-lg shadow-md"/>
      <h3 className="font-semibold">The Iowa Kingmakers Trying to Derail Trump</h3>
      <p className="text-sm">With the former President polling well ahead of his rivals, a group of local G.O.P influencers gathered to attempt to push their party in another direction.</p>
      <p className="text-sm text-gray-500">By Robert Samuels</p>
    </div>
    
    <div>
      <img src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="Article Image" className="w-full object-cover h-32 rounded-lg shadow-md"/>
      <h3 className="font-semibold">The Iowa Kingmakers Trying to Derail Trump</h3>
      <p className="text-sm">With the former President polling well ahead of his rivals, a group of local G.O.P influencers gathered to attempt to push their party in another direction.</p>
      <p className="text-sm text-gray-500">By Robert Samuels</p>
    </div>
    
    <div>
      <img src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="Article Image" className="w-full object-cover h-32 rounded-lg shadow-md"/>
      <h3 className="font-semibold">The Iowa Kingmakers Trying to Derail Trump</h3>
      <p className="text-sm">With the former President polling well ahead of his rivals, a group of local G.O.P influencers gathered to attempt to push their party in another direction.</p>
      <p className="text-sm text-gray-500">By Robert Samuels</p>
    </div>
    
  </div>
</div>

    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:flex">
    <div className="md:w-1/2">
      <img className="h-64 w-full object-cover md:h-full" src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="News articles"/>
    </div>
    <div className="p-6 md:w-1/2">
      <div className="flex items-baseline">
        <span className="text-gray-600 font-semibold">News</span>
        <span className="ml-2 text-sm text-gray-500">4 articles</span>
      </div>
      <ul className="mt-4 space-y-4">
        <li className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">With the former President polling well ahead of his rivals, a group of local G.O.P influencers gathered to attempt to push their party in another direction.</h3>
            <p className="mt-2 text-sm text-gray-700">How Trump Captured Iowa’s Religious Right</p>
            <p className="mt-1 text-sm text-gray-500">By John Doe</p>
          </div>
          <img className="h-16 w-16 object-cover rounded" src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="People holding flags"/>
        </li>
        <li className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">The state’s evangelical voters were once skeptical of the former President. Now they are among his strongest supporters.</h3>
            <p className="mt-2 text-sm text-gray-700">How Trump Captured Iowa’s Religious Right</p>
            <p className="mt-1 text-sm text-gray-500">By Jane Doe</p>
          </div>
          <img className="h-16 w-16 object-cover rounded" src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="Interior of a church"/>
        </li>
        <li className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">In the run-up to the Iowa caucuses, Nikki Haley made her closing argument to the state's voters, pitching herself as the anti-chaos candidate.</h3>
            <p className="mt-2 text-sm text-gray-700">The Last G.O.P Moderate in the Race</p>
            <p className="mt-1 text-sm text-gray-500">By Sam Doe</p>
          </div>
          <img className="h-16 w-16 object-cover rounded" src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="American flag"/>
        </li>
        <li className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">The Governor has won backing of state's political establishment. But as long as he comes across as Trump's mini-me, he doesn’t have a prayer.</h3>
            <p className="mt-2 text-sm text-gray-700">Ron DeSantis’s Misguided Approach in Iowa</p>
            <p className="mt-1 text-sm text-gray-500">By Kim Doe</p>
          </div>
          <img className="h-16 w-16 object-cover rounded" src="https://www.whitehouse.gov/wp-content/uploads/2021/01/45_donald_trump.jpg" alt="Ron DeSantis at a podium" />
        </li>
      </ul>
    </div>
  </div>
</>  
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