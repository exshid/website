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
      <Base>
        <EditorContainer>
      <EditorPickCenter items={articles} />
      <EditorPickRight items={articles} />
  <EditorPickLeft items={articles} />
  </EditorContainer>
  <MustRead items={articles} />
      <HeadLines items={articles} />
      <LatestPostsContainer>
      <LatestPosts items={articles} />
      <Sidebar items={articles} />
        </LatestPostsContainer>
      <DontMissContainer>
      <DontMiss items={articles} headline="News" length={rweetsLength}/>
      <DontMiss items={articles} headline="AI" length={rweetsLength}/>
      </DontMissContainer>
  
      </Base>
    );
  };
  
  export default Home;
  
  export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
    const db = client.db()
    const tweetsCollection = db.collection('rweets');
    const rweets = await tweetsCollection.find().toArray()
    client.close()
    const rweetsLength = [...rweets].length;
    return {
        props: {
          articles: [...rweets].reverse().slice(0, 20).map(rweet => ({
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
      
  }
  