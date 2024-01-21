import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";

// category page
const Search = ({ search}) => {
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
      const [isLoading, setIsLoading] = useState(true);

      const [windowWidth, setWindowWidth] = useState(0);
      
      useEffect(() => {
      const handleResize = () => {
      setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
      window.removeEventListener('resize', handleResize);
      };
      }, []); 
    
    const [mydata, setMydata] = useState(null);

    useEffect(() => {
        fetch('/api/get-data')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMydata(data);
                setIsLoading(false);

            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);

            });
    }, []);
    console.log(mydata); 


    if (isLoading) {
        return <div>Loading...</div>;
    }


  return (
    <Base title={search}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{search}</span>{" "}
            search
          </h1>
          <div className="w-full xl:px-20 divide-y p-3">
      {mydata.map((item) => (
  <>
  {windowWidth > 1024 ? (

<div key={item._id} className="flex">
  <Image src={item.image} alt={item.title}
            className="object-cover !relative lg:pr-4 lg:py-3 w-28 h-20 md:w-60 md:h-48 lg:w-[450px] lg:h-[350px] rounded-m"
                    objectFit="cover"/>
 <div>
 <Link href={`/${item._id.toString()}`}>

            <h3 className="font-semibold transition text-black hover:underline hover:text-gray-500 text-lg md:text-xl lg:text-4xl pt-2">{item.title}</h3>
</Link>
            <p className="py-2 text-black text-lg">{item.description}</p>
<div className="flex flex-row">
<Link href={`/${item.author}`}>

              <span className="text-lg uppercase w-max font-bold text-black hover:underline hover:text-gray-500">{item.author}</span>
</Link>
              <span className="inline-block w-max mx-2">•</span>
  <span className="text-lg w-max">{formatDate(item.date)}</span>
  </div>
      </div>      
          </div>

     
     ) : (
      <div key={Math.random()} className="flex flex-col">
         <Link href={`/${item._id.toString()}`}>

        <h3 className="font-semibold transition hover:underline text-lg md:text-xl lg:text-3xl pt-2">{item.title}</h3>
</Link>
          <div className="flex flex-row-reverse justify-between">
      <Image src={item.image} alt={item.title}
      className="object-cover !relative lg:p-4 ml-2 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"
       objectFit="cover"/>
       <div>
       <p className="py-2 text-black">
     {item.description.length > 81 
       ? `${item.description.substring(0, 81)}...` 
       : item.description}
         </p>
      <div>
        <span className="font-bold text-black pb-2">{item.author}</span>
      </div>
      </div>
      </div>
    </div> )}
</>
      ))}
  </div>
          </div>
    </Base>
  );
};

export default Search;

export async function getServerSideProps(context) {
    const { search } = context.params;

    return {
        props: {
          search: search
        },
      };
    };
