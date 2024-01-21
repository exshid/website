import Base from "@layouts/Baseof";
import MustRead from "@layouts/components/MustRead";
import EditorContainer from "@layouts/components/EditorContainer";
import EditorPickLeft from "@layouts/components/EditorPickLeft";
import EditorPickCenter from "@layouts/components/EditorPickCenter";
import EditorPickRight from "@layouts/components/EditorPickRight";
import HeadLines from "@layouts/components/HeadLines";
import CategoryLinks from "@layouts/components/CategoryLinks";
import DontMissContainer from "@layouts/components/DontMissContainer";
import DontMiss from "@layouts/components/DontMiss";
import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestPosts from "@layouts/components/LatestPosts";
import Sidebar from "@layouts/components/Sidebar";
import Posts from "@partials/Posts";

const SearchPage = ({ articles }) => {
  return (
    <Base >
      <div className="section">
          <h1 className="h2 mb-8 text-center">
            Showing posts from <span className="text-primary"></span>{" "}
            category
          </h1>
          <LatestPostsContainer>
         <LatestTags items={articles} />
            </LatestPostsContainer>
        </div>
    </Base>
  );
};

export default SearchPage;

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


export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority'); 
  const db = client.db() 
  const tweetsCollection = db.collection('rweets');
  let posts = await tweetsCollection.find().toArray();

    posts = posts.reverse().slice(0, 20).map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
    

  return {
    props: { 
      posts: posts, 
    },
  };
};
