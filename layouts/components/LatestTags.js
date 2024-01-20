import React, { useState, useEffect } from 'react';

import Image from 'next/image'
import Link from 'next/link';

const LatestTags = ({ items }) => {
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
  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full xl:px-20 divide-y p-3">
      {posts.map((item) => (
  <>
  {windowWidth > 1024 ? (

<div key={item.id} className="flex">
<Image src={item.image} alt={item.title}
            className="object-cover !relative lg:pr-4 lg:py-3 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"
                    objectFit="cover"/>
 <div>
 <Link href={`/${item._id}`}>

            <h3 className="font-semibold transition hover:underline text-lg md:text-xl lg:text-3xl pt-2">{item.title}</h3>
</Link>
            <p className="py-2 text-black">{item.description}</p>
              <p className="font-bold text-black">{item.author}</p>
      </div>      
          </div>
     
     ) : (
      <div key={Math.random()} className="flex flex-col">
         <Link href={`/${item._id}`}>

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
  )
    };
  
export default LatestTags