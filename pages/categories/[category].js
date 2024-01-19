import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;
import { MongoClient } from 'mongodb'
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestPosts from "@layouts/components/LatestPosts";

// category page
const Category = ({ category, posts }) => {
  console.log( category, posts )
  return (
    <Base title={category}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary">{category}</span>{" "}
            category
          </h1>
          <LatestPostsContainer>
          {posts.length > 0 && <LatestPosts items={posts} />}
    
    </LatestPostsContainer>
        </div>
      </div>
    </Base>
  );
};

export default Category;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  
  const allCategories = rweets.reduce((acc, tweet) => {
    const cats = JSON.parse(tweet.cats); // Parse the JSON string into a JavaScript array
    return acc.concat(cats);
  }, []);
  const categories = [...new Set(allCategories)]; // Extract unique categories
  
  client.close()

  const paths = allCategories.map((category) => ({
    params: {
      category: category,
    },
  }));

  return { paths, fallback: false };
};


export async function getStaticProps({ params }) {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db() 
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

  // Convert _id to string
  posts = posts.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));

  const filteredPost = posts.filter(item => {
      const catsArray = JSON.parse(item.cats);
      return catsArray.includes(params.category);
  });
  

  return {
    props: { 
      posts: filteredPost, 
      category: params.category, 
      raw: posts,
    },
  };
};
