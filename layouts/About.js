'use client'
import Social from "@components/Social";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import React, { useEffect } from 'react';

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, social } = frontmatter;

  useEffect(() => {
    const rssUrl = 'https://www.gamespot.com/feeds/news';

    // Define your POST request parameters (if needed)
    const postData = {
      // You can include any necessary data here if required by the RSS service
    };

    // Define the options for the fetch request
    const requestOptions = {
      method: 'POST',
      // headers: {
      //   // Add any headers if required
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(postData), // You can convert postData to the desired format
    };

    // Make the POST request using fetch
    fetch(rssUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Log the response data to the console
        console.log('Response Data:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);
    
    
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

        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;
