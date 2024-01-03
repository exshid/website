import React from 'react';

// Define a custom component called MustRead that takes an array of articles as props
const MustRead = ({ articles }) => {
  return (
    // Use a div element with flex and flex-wrap classes to create a responsive layout
    <div className="flex flex-wrap">
      // Map over the articles array and render each article as a child component
      {articles.map((article) => (
        // Use a div element with w-full and md:w-1/4 classes to make each article take up full width on small screens and one-fourth width on medium screens
        <div className="w-full md:w-1/4 p-4">
          // Use the ArticleCard component defined below to display the article details
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
      // Use a div element with flex and flex-shrink-0 classes to create a horizontal layout
      <div className="flex">
        // Use an img element with h-48, w-full, object-cover, and md:w-48 classes to display the article image with a fixed height and width
        <img
          className="h-48 w-full object-cover md:w-48"
          src={image}
          alt={title}
        />
        // Use a div element with p-8 class to add some padding around the article text
        <div className="p-8">
          // Use a div element with uppercase, tracking-wide, text-sm, text-indigo-500, and font-semibold classes to display the article title in a stylized way
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          // Use a p element with mt-2 and text-gray-500 classes to display the article description with some margin and gray color
          <p className="mt-2 text-gray-500">{description}</p>
          // Use a p element with mt-2 and text-gray-700 classes to display the article author with some margin and dark gray color
          <p className="mt-2 text-gray-700">By {author}</p>
        </div>
      </div>
    </div>
  );
};

export default MustRead;
