import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestTags from "@layouts/components/LatestTags";
import Base from "@layouts/Baseof";
import Posts from "@layouts/partials/Posts";
import { getSinglePage } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";

const SearchPage = ({ articles }) => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key);
  let filteredPosts = articles.filter(post => 
    (post.title && post.title.includes(query.key)) || 
    (post.content && post.content.includes(query.key)) || 
    (post.description && post.description.includes(query.key))
  );


  return (

    <Base title={`Search results for ${query.key}`}>
      <div className="section">
      <h1 className="h2 mb-8 text-center">
            Search results for <span className="text-primary">{query.key}</span>
          </h1>
          <LatestPostsContainer>
          {searchResults.length > 0 ? (

         <LatestTags items={filteredPosts} />
         ) : (
          <div className="py-24 text-center text-h3 shadow">
          No Search Found
        </div>
          )}
         </LatestPostsContainer>
        </div>
    </Base>

  );
};

export default SearchPage;

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray()
  client.close()
  const rweetsLength = [...rweets].length;
  return {
      props: {
        articles: [...rweets].reverse().map(rweet => ({
          author: rweet.author,
          title: rweet.title,
          content: rweet.content,
          description: rweet.description,
          url: rweet.url,
          date: rweet.date,
          _id: rweet._id.toString(),
          image: rweet.image
        })),
      },
    }
    
}
