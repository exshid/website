import React from 'react';

// Define a custom component called MustRead that takes an array of articles as props
const MustRead = ({ articles }) => {
  return (
    // Use a div element with flex and flex-wrap classes to create a responsive layout
    <div className="flex flex-wrap">
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
  // Fetch the RSS feed
fetch('https://www.gamespot.com/feeds/news')
.then(response => response.text())
.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
.then(data => {

  // Get all the <item> elements
  const items = data.querySelectorAll('item');
  
  // Get the last item
  const lastItem = items[items.length - 1];
  
  // Save it to a variable
  const lastNews = lastItem.innerHTML;
  
  console.log(lastNews);
});
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
