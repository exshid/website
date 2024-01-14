import Link from 'next/link';
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
<>
<div className="flex space-x-4 px-80 py-3 w-full justify-between border-y">
      {categoriesPost.map((item) => {
        const href = item.toLowerCase().split(' ').join('-');
          <Link key={Math.random()} href={`/${href}`}>
            <a className="text-xs font-medium text-gray-600 hover:text-gray-900">
              {item}
            </a>
          </Link>
      })}
    </div>

<div className="flex px-20">
<div className="w-1/4 pt-4 divide-y">
      {articles.slice(0, 5).map((item) => {
          <div key={Math.random()} className="bg-white p-4">
            <div className="font-bold text-black">{item.title}</div>
            <div className="text-gray-500">{item.author}</div>
          </div>
      })}
    </div>

    <div className="bg-white p-4 w-2/4">
      {articles.slice(0, 1).map((item) => (
        <div key={Math.random()}>
          <img src={item.image} alt={item.title} className="object-cover p-3 w-full h-[26rem] rounded-lg"/>
          <div className="font-bold p-3 text-black text-3xl">{item.title}</div>
          <div className="text-gray-500 p-3">{item.description}</div>
          <div className="text-gray-500 p-3">{item.author}</div>
        </div>
      ))}
    </div>


    <div className="w-1/4 pt-4 divide-y">
      {articles.slice(0, 3).map((item) => (
        <div key={Math.random()} className="bg-white p-4">
          <div className="font-bold text-black">{item.title}</div>
          <div className="text-gray-500">{item.description}</div>
          <div className="text-gray-500">{item.author}</div>
        </div>
      ))}
    </div>

      </div>

<div className="flex flex-wrap divide-x px-20">
                  {articles.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
    <div className="flex flex-wrap justify-between p-4 px-20">
  <h2 className="w-full text-2xl font-bold mb-4">PODCASTS</h2>
  <div className="divide-x flex flex-wrap justify-between">
  {articles.slice(0, 4).map((podcast) => (
    <div key={Math.random()} className="w-full sm:w-1/2 lg:w-1/4 py-2">
      <div className="py-4 rounded-lg flex">
        <img src={podcast.image} alt={podcast.title} className="w-full h-32 px-3 rounded-sm object-cover mb-2"/>
       <div>
        <h3 className="text-lg font-bold mb-1">{podcast.title}</h3>
        <p className="text-xs text-gray-400 mt-2">{podcast.author}</p>
        </div>
      </div>
    </div>
  ))}
  </div>
</div>
<div className="bg-white p-6 flex px-20">
<div className="w-3/4 pr-20 divide-y">
      {articles.map((item) => (
        <div key={Math.random()} className="flex">
          <img src={item.image} alt={item.title} className="object-cover p-3 h-52 rounded-lg"/>
          <div>
            <h3 className="font-semibold text-2xl pt-2">{item.title}</h3>
            <p className="py-2">{item.description}</p>
            <p className="text-sm text-gray-500">{item.author}</p>
          </div>
        </div>
      ))}
    </div>

  <div className="flex flex-col w-1/4 divide-y">
  {articles.slice(0, 6).map((article) => (
    <div key={Math.random()} className="flex justify-between items-start p-2">
      <div className="flex-1 space-y-2">
        <h2 className="font-bold text-lg">{article.title}</h2>
      </div>
      <img className="w-32 h-20 object-cover" src={article.image} alt={article.title} />
    </div>
  ))}
</div>

</div>

<div className="px-20 mx-auto bg-white divide-x rounded-lg overflow-hidden md:flex">
      <div className="p-6 md:w-1/2">
        <div className="flex items-baseline">
          <span className="text-gray-600 font-semibold">News</span>
          <span className="ml-2 text-sm text-gray-500">5 articles</span>
        </div>
        <ul className="mt-4 space-y-4">
          {articles.map((item) => (
            <li key={Math.random()} className="flex items-start space-x-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.description}</h3>
                <p className="mt-2 text-lg text-gray-700 font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.author}</p>
              </div>
              <img className="h-16 w-16 object-cover rounded" src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 md:w-1/2">
        <div className="flex items-baseline">
          <span className="text-gray-600 font-semibold">News</span>
          <span className="ml-2 text-sm text-gray-500">5 articles</span>
        </div>
        <ul className="mt-4 space-y-4">
          {articles.map((item) => (
            <li key={Math.random()} className="flex items-start space-x-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.description}</h3>
                <p className="mt-2 text-lg text-gray-700 font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.author}</p>
              </div>
              <img className="h-16 w-16 object-cover rounded" src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>    </div>
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