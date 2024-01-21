import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";

// category page
const Search = ({ search}) => {
    const [mydata, setMydata] = useState(null);

    useEffect(() => {
        fetch('/api/get-data')
            .then(response => response.json())
            .then(data => {
                console.log(data); // This will log the 'result' from your API
                setMydata(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    console.log(mydata); // This will log the 'result' from your API

  return (
    <Base title={search}>
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{search}</span>{" "}
            search
          </h1>
          <LatestPostsContainer>
            </LatestPostsContainer>
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
