import React, { useEffect, useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import xml2js from 'xml2js';
import { MongoClient } from 'mongodb'
import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import MustRead from "@layouts/components/MustRead";
import EditorContainer from "@layouts/components/EditorContainer";
import EditorPickLeft from "@layouts/components/EditorPickLeft";
import EditorPickCenter from "@layouts/components/EditorPickCenter";
import EditorPickRight from "@layouts/components/EditorPickRight";
import HeadLines from "@layouts/components/HeadLines";
import CategoryLinks from "@layouts/components/CategoryLinks";
import DontMissContainer from "@layouts/components/DontMissContainer";
import DontMiss from "@layouts/components/DontMiss";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestPosts from "@layouts/components/LatestPosts";
import Sidebar from "@layouts/components/Sidebar";
import Posts from "@partials/Posts";

const Home = ({ articles, tv, games, movies,news, tvPosts, moviesPosts, newsPosts, gamesPosts }) => {

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
            if (oldTitle && firstImageURL) {
    
            if (oldTitle !== firstImageURL) {
    
            run(title);
            runPost(postDescription);
            runTags(title);
            runCats(title);
            runDescription(intro);
            runURL(title);
            } else{
    
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
            { text: `sir, rewrite this title with a publish-ready quality: ${title}. do it only once, and send nothing other than the rewritten title. do not use quotes at the end or beginning of the new title` }
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
            { text: `sir, rewrite this post intro with a publish-ready quality in less than forty words: ${intro}. do it only once, and send nothing other than the rewritten post intro.` }
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
            { text: `sir, you are a professional writer. rewrite this post in a publish-ready quality. if there is any quotes, do not change it any way. separate pargaraphs using HTML <p> tags, and if there is any trace of mention another website or the author at the end of the post, remove it, and if there is a youtube or twitter link, embed it: ${postDescription}` }
      
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
            { text: `what people, games, films, tv shows, companies, etc are mentioned in this title? ${title}; write them as tags in this format: ["one", "two"]; if none, send an empty array.` }
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
            { text: `out of the categories in the array [
                "Games", 
                "Movies",
                "TV",
                "Music",
                "Books",
                "AI", 
                "VR",
                "Animation",
                "Anime",
                "Comics",
                "Celebrities"
                ], what would be proper categories for a news article with this title? ${title}; write them in this format: ["diy", "toy"]; if there is none, send an array of ["News"]` }
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
            { text: `what would be proper six-word url PermaLink for a news article with this title? ${title}; write it all in lowercase and write - instead of space.` }
          ];
      
const generationConfigURL = {
  temperature: 0.8,
  topK: 1,
  topP: 1,
  maxOutputTokens: 22,
};

const result = await model.generateContent({
  contents: [{ role: "user", parts }],
  generationConfig: generationConfigURL,
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
        if (firstItemTitle && firstItemPost && firstTags && firstCats && firstURL && firstImageURL && firstIntro && oldTitle !== firstImageURL) {
        
          postSenderHandler()
      }
        
    }, [firstItemTitle, firstItemPost, firstTags, firstCats, firstURL, firstImageURL,firstIntro, oldTitle]);
      
  return (
    <Base>
      <EditorContainer>
    <EditorPickCenter items={articles} />
    <EditorPickRight items={tvPosts} category={tv} />
<EditorPickLeft items={moviesPosts} category={movies} />
</EditorContainer>
<MustRead items={gamesPosts} />
    <HeadLines items={tvPosts} category={tv} />
    <div className="px-4 pt-3 md:px-6 lg:p-6 xl:px-20">
    <span className="text-black text-3xl font-semibold uppercase pl-3">Latest</span>
    </div>
    <LatestPostsContainer>
    <LatestPosts items={articles} />
    <Sidebar items={moviesPosts} category={movies} />
      </LatestPostsContainer>
    <DontMissContainer>
    <DontMiss items={gamesPosts} category={games}/>
    <DontMiss items={newsPosts} category={news} />
    </DontMissContainer>

    </Base>
  );
};

export default Home;

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  client.close()
  let reversedRweets = [...rweets].reverse();
  let tv = 'TV'
  let movies = 'Movies'
  let news = 'News'
  let games = 'News'
  let tvPosts = reversedRweets.filter(item => item.cats.includes(tv)).slice(0, 3);
  let moviesPosts = reversedRweets.filter(item => item.cats.includes(movies)).slice(0, 5);
  let gamesPosts = reversedRweets.filter(item => item.cats.includes(games)).slice(0, 4);
  let newsPosts = reversedRweets.filter(item => item.cats.includes(news)).slice(0, 4);


  return {
    props: {
      articles: reversedRweets.slice(0, 20).map(rweet => ({
        author: rweet.author,
        title: rweet.title,
        content: rweet.content,
        description: rweet.description,
        url: rweet.url,
        tags: rweet.tags,
        cats: rweet.cats,
        date: rweet.date,
        id: rweet._id.toString(),
        image: rweet.image
      })),
      tvPosts: tvPosts.map(rweet => ({
        author: rweet.author,
        title: rweet.title,
        description: rweet.description,
        url: rweet.url,
        id: rweet._id.toString(),
        image: rweet.image
      })),
      moviesPosts: moviesPosts.map(rweet => ({
        author: rweet.author,
        title: rweet.title,
        description: rweet.description,
        url: rweet.url,
        id: rweet._id.toString(),
        image: rweet.image
      })),
      gamesPosts: gamesPosts.map(rweet => ({
        author: rweet.author,
        title: rweet.title,
        description: rweet.description,
        url: rweet.url,
        id: rweet._id.toString(),
        image: rweet.image
      })),
      newsPosts: newsPosts.map(rweet => ({
        author: rweet.author,
        title: rweet.title,
        description: rweet.description,
        url: rweet.url,
        id: rweet._id.toString(),
        image: rweet.image
      })),

      movies: movies,
      news: news,
      games: games,
      tv: tv,

    },
    revalidate: 1
  }
      
}
