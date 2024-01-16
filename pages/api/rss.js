import fetch from 'node-fetch';
import xml2js from 'xml2js';

const rssUrl = 'http://feeds.feedburner.com/ign/news';

export default async function handler(req, res) {











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











  

  const categoriesPost = [
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


  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyASVdR_fyNnM8cAhJbTcL0BKbri7HnaNZU";

  try {
    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text();

    xml2js.parseString(data, (err, result) => {
      if (err) {
        throw new Error('Error parsing XML');
      }

      const firstItem = result.rss.channel[0].item[0];

      const title = firstItem.title[0];
      const intro = firstItem.description[0];
      const postDescription = firstItem['content:encoded'][0];
      const imageUrl = firstItem['media:content'][0]['$']['url'];


      async function postGet() {
    
        const responseGet = await fetch('/api/get-data', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      
      if (responseGet.ok) {
          const data5 = await responseGet.json();
          const oldTitle = data5[data5.length - 1].image;
    
      } else {
          console.log('Error:', responseGet.status, responseGet.statusText);
      }
    }






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
          const firstItemTitle = response.text();
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
          const firstIntro = response.text();
        };
    
    
        const runPost = async (postDescription) => {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
          const parts = [
            { text: `sir, you are a professional writer. rewrite this post in a publish-ready quality. if there is any quotes, do not change it any way. separate pargaraphs using HTML <p> tags, and if there is any trace of mention another website, remove it, and if there is a youtube or twitter link, embed it: ${postDescription}` }
      
          ];
      
          const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
          });
      
          const response = result.response;
          const firstItemPost = response.text();
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
          const firstTags = response.text();
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
          const firstCats = response.text();
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
          const firstURL = response.text();
        };
    
        fetchData().catch((error) => {
          console.error('Error:', error);
        });
  


    if (oldTitle !== imageUrl) {

      res.status(200).json({
        firstItemTitle,
        firstIntro,
        firstItemPost,
        imageUrl,
        firstTags,
        firstCats,
        firstURL,
      });
      postSenderHandler()
    }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occured' });
  }
}
