import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { slugify } from "@lib/utils/textConverter";
import { useRouter } from "next/router";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Posts from "@partials/Posts";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";

// category page
const Search = ({ search }) => {
  const { title } = config.site;

  const router = useRouter();
  const { query } = router;

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const [isLoading, setIsLoading] = useState(true);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [mydata, setMydata] = useState(null);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    fetch("/api/get-data")
      .then((response) => response.json())
      .then((data) => {
        setMydata(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (mydata) {
      let searchLower = search.toLowerCase();
      let filteredPosts = mydata.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(searchLower)) ||
          (post.content && post.content.toLowerCase().includes(searchLower)) ||
          (post.description &&
            post.description.toLowerCase().includes(searchLower)),
      );
      setFiltered(filteredPosts);
    }
  }, [mydata, search]);

  return (
    <Base title={`Search results for ${search} - ${title} `}>
      <div className="section">
        <div className="pt-3 md:px-6 lg:p-6 xl:px-20 px-4">
          <h1 className="text-black xl:px-20 px-4 py-3 text-3xl font-semibold italic uppercase">
            {search}
          </h1>
        </div>

        <LatestPostsContainer>
          {!filtered ? (
            <div className="w-full xl:px-20 text-black p-3">Loading...</div>
          ) : (
            <div className="w-full xl:px-20 divide-y p-3">
              {filtered.length > 0 ? (filtered
                .reverse()
                .slice(0, 20)
                .map((item) => (
                  <>
                    {windowWidth > 1024 ? (
                      <div key={item._id} className="flex">
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="object-cover !relative lg:pr-4 lg:py-3 w-28 h-20 md:w-60 md:h-48 lg:w-[450px] lg:h-[350px] rounded-m"
                          objectFit="cover"
                        />
                        <div>
                          <Link href={`/posts/${item._id.toString()}`}>
                            <h3 className="font-semibold transition text-black hover:underline hover:text-gray-500 text-lg md:text-xl lg:text-4xl pt-2">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="py-2 text-black text-lg">
                            {item.description}
                          </p>
                          <div className="flex flex-row">
                            <Link href={`/${item.author}`}>
                              <span className="text-lg uppercase w-max font-bold text-black hover:underline hover:text-gray-500">
                                {item.author}
                              </span>
                            </Link>
                            <span className="inline-block w-max mx-2">•</span>
                            <span className="text-lg w-max">
                              {formatDate(item.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={Math.random()} className="flex flex-col">
                        <Link href={`/posts/${item._id.toString()}`}>
                          <h3 className="font-semibold transition hover:underline text-lg md:text-xl lg:text-3xl pt-2">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex flex-row-reverse justify-between">
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="object-cover !relative lg:p-4 ml-2 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"
                            objectFit="cover"
                          />
                          <div>
                            <p className="py-2 text-black">
                              {item.description.length > 81
                                ? `${item.description.substring(0, 81)}...`
                                : item.description}
                            </p>
                            <div>
                              <span className="font-bold text-black pb-2">
                                <Link href={`/authors/${item.author}`}>
                                  {item.author}
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))
                
                ) :<div className="w-full xl:px-20 text-black p-3">Nothing found...</div>
              }
            </div>
          )}
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
      search: search,
    },
  };
}
