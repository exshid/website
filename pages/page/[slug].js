import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
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
const { blog_folder } = config.settings;
import { categoriesPost } from "@layouts/components/categories.js";

const BlogPagination = ({ posts, authors, currentPage, pagination }) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Base>
    <CategoryLinks items={categoriesPost} />
      <EditorContainer>
    <EditorPickLeft items={articles} />
    <EditorPickCenter items={articles} />
    <EditorPickRight items={articles} />
    </EditorContainer>

<MustRead articles={articles} />
    <HeadLines items={articles} />
    <LatestPostsContainer>
    <LatestPosts items={articles} />
    <Sidebar items={articles} />
      </LatestPostsContainer>
    <DontMissContainer>
    <DontMiss items={articles} headline="News"/>
    <DontMiss items={articles} headline="News"/>

    </DontMissContainer>
      <section className="section">
        <div className="container">
          <Posts className="mb-16" posts={currentPosts} authors={authors} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </section>

    </Base>
  );
};


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
      }))
    },
    revalidate: 1
  }
}
  export default BlogPagination;
