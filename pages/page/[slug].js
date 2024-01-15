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
import { articles } from "@layouts/components/articles.js";
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

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`);
  const authors = getSinglePage("content/authors");

  return {
    props: {
      pagination: pagination,
      posts: posts,
      authors: authors,
      currentPage: currentPage,
    },
  };
};
