'use client'
import Social from "@components/Social";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js';
import axios from 'axios';

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, social } = frontmatter;

  const [firstItemTitle, setFirstItemTitle] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    fetch('/api/rss')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response as text
      })
      .then((xmlData) => {
        // Parse the XML data into JSON
        xml2js.parseString(xmlData, (err, result) => {
          if (err) {
            throw new Error('Error parsing XML');
          }

          // Extract the title of the first item
          const firstItem = result.rss.channel[0].item[0];
          const title = firstItem.title[0];

          // Set the title in the component state
          setFirstItemTitle(title);

          // Send the title to the OpenAI API
          sendTitleToOpenAI(title);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const sendTitleToOpenAI = async (title) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-babbage-001',
          prompt:
            'Title: "' +
            title +
            '"\n\nthree questions. if the answer to all those is yes, send "true". If one is no, send "false".\n1-is this a news article?\n2-is this an advertisement?\n3-is this noteworthy for a website?\n',
          temperature: 1,
          max_tokens: 1,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_KEY', // Replace with your OpenAI API key
          },
        }
      );
  
      // Check if the response contains text
      if (response.data.choices && response.data.choices.length > 0) {
        // Extract the text from the response
        const aiResponse = response.data.choices[0].text;
  
        // Log the OpenAI API response
        console.log('OpenAI API Response:', aiResponse);
  
        // Set the AI response in the component state
        setAiResponse(aiResponse);
      } else {
        console.warn('OpenAI API response does not contain text.');
      }
    } catch (error) {
      console.error('Error sending request to OpenAI:', error);
    }
  };
  
      
      return (
    <section className="section">
      <div className="container text-center">
        {image && (
          <div className="img-cover mb-8">
            <Image
              src={image}
              width={920}
              height={515}
              alt={title}
              className="rounded-lg"
            />
          </div>
        )}
        {markdownify(title, "h1", "h2")}
        <Social source={social} className="social-icons-simple my-8" />
<h5>{firstItemTitle}</h5>
        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;
