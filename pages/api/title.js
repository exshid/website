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

const fs = require('fs');

// Assuming your data is in a file called 'data.js'
fs.readFile('../../layouts/components/title.js', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }


    // This is the regex to find the title string in your file
    let regex = /title: "([^"]*)"/g;

    // This is the replacement string
    let newdata = data.replace(regex, `title: "${firstItemTitle}"`);

    fs.writeFile('../../layouts/components/title.js', newdata, 'utf8', function(err) {
      if (err) return console.log(err);
    });
});
