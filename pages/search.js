import LatestPostsContainer from "@layouts/components/LatestPostsContainer";
import LatestPosts from "@layouts/components/LatestPosts";
import Base from "@layouts/Baseof";

const SearchPage = ({ articles }) => {
  return (

    <Base title={`Search results for key}`}>
      <div className="section">
      <h1 className="h2 mb-8 text-center">
            Search results for <span className="text-primary"></span>
          </h1>
          <LatestPostsContainer>

         <LatestPosts items={articles} />
          <div className="py-24 text-center text-h3 shadow">
          No Search Found
        </div>
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
  return {
      props: {
        articles: [...rweets].reverse().map(rweet => ({
          author: rweet.author,
          title: rweet.title,
          content: rweet.content,
          description: rweet.description,
          url: rweet.url,
          tags: rweet.tags,
          cats: rweet.cats,
          date: rweet.date,
          id: rweet._id.toString(),
          image: rweet.image
        })),
        rweetsLength: rweetsLength
      },
      revalidate: 1
    }
 };
