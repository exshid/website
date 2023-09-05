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
/*
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
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
      */

  
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: 'Write a joke about cheese.',
        max_tokens: 50,
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE',
          'Content-Type': 'application/json',
        },
      });

      const jokeText = response.data.choices[0].text;

      // Save the joke in state
      setJoke(jokeText);
      console.log('ChatGPT Response:', jokeText);

      // Now, ask ChatGPT to repeat the joke in all caps
      const repeatResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Repeat the joke "${jokeText}" in all caps.`,
        max_tokens: 50,
      }, {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
      });

      const repeatedJoke = repeatResponse.data.choices[0].text;
      console.log('ChatGPT Repeat Response:', repeatedJoke);
    } catch (error) {
      console.error('Error fetching joke:', error);
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
        <div className="App">
      <h1>Cheesy Joke Generator</h1>
      <button onClick={fetchJoke}>Get Cheese Joke</button>
      <div>
        <h2>Joke:</h2>
        <p>{joke}</p>
      </div>
    </div>

          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;
