import React, { useEffect, useState } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import xml2js from 'xml2js';

// Define a custom component called MustRead that takes an array of articles as props
const MustRead = ({ articles }) => {
 const [firstItemTitle, setFirstItemTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rss');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const xmlData = await response.text();
        const result = await new Promise((resolve, reject) => {
          xml2js.parseString(xmlData, (err, result) => {
            if (err) {
              reject('Error parsing XML');
            } else {
              resolve(result);
            }
          });
        });

        const firstItem = result.rss.channel[0].item[0];
        const title = firstItem.title[0];
        setFirstItemTitle(title);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const generateContent = async () => {
    try {
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

      const parts = [{ text: `rewrite this title: "${firstItemTitle}"` }];

      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      console.log(response.text(), firstItemTitle);
      setFirstItemTitle(response.text());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (firstItemTitle) {
      generateContent();
    }
  }, [firstItemTitle]);

run();
  return (
    // Use a div element with flex and flex-wrap classes to create a responsive layout
    <div className="flex flex-wrap">
              <p className="rss-item-content">{firstItemTitle}</p>

      {articles.map((article) => (
        // Use a div element with w-full and md:w-1/4 classes to make each article take up full width on small screens and one-fourth width on medium screens
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};

// Define a custom component called ArticleCard that takes the image, title, description, and author of an article as props
const ArticleCard = ({ image, title, description, author }) => {
  return (
    // Use a div element with max-w-sm, bg-white, rounded-xl, and shadow-md classes to create a card-like appearance
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
