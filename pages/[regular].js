import { MongoClient, ObjectId } from 'mongodb'
import config from "@config/config.json";
import NotFound from "@layouts/404";
import About from "@layouts/About";
import Base from "@layouts/Baseof";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import PostSingle from "@layouts/PostSingle";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
const { blog_folder } = config.settings;


const RegularPages = ({ props }) => {

    return <>
    <Base
      title={props.rweetData.title}
      description={props.rweetData.description ? props.rweetData.description : ''}
      meta_title={props.rweetData.description ? props.rweetData.description : ''}
      image={props.rweetData.image}
    >
         <div>
            <p>{props.rweetData.title}</p>

            <p className='tweettext'>{props.rweetData.content}</p>
        </div>

    </Base>


         <div>
            <p>{props.rweetData.title}</p>

            <p className='tweettext'>{props.rweetData.content}</p>
        </div>
        </>
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
    const db = client.db()
    const tweetsCollection = db.collection('rweets');

    const rweets = await tweetsCollection.find({}, {
        _id: 1,
    }).toArray()
    client.close()
    return {
        fallback: 'blocking',
        paths: rweets.map(rweet => ({
            params: {
              regular: rweet._id.toString()
            },
        }))
    }
}

export async function getStaticProps(context) {
  const tweetId = context.params.regular;

  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')

  const db = client.db()

  const tweetsCollection = db.collection('rweets');

  const rweet = await tweetsCollection.findOne({ _id: new ObjectId(tweetId) })

  client.close()
  return {
      props: {
          rweetData: {
            title: rweet.title,
            content: rweet.content,
            description: rweet.description,
            url: rweet.url,
            tags: rweet.tags,
            cats: rweet.cats,
            date: rweet.date,
            id: rweet._id.toString(),
            author: rweet.author,
            image: rweet.image
}
      }
  }


}
export default RegularPages;
/*

// for all regular pages
const RegularPages = ({ slug, data, postSlug, authors, posts }) => {
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {/* single post 
      {postSlug.includes(slug) ? (
        <PostSingle slug={slug} post={data} authors={authors} posts={posts} />
      ) : layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "about" ? (
        <About data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const regularSlugs = getSinglePage("content");
  const postSlugs = getSinglePage(`content/${blog_folder}`);
  const allSlugs = [...regularSlugs, ...postSlugs];
  const paths = allSlugs.map((item) => ({
    params: {
      regular: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  const allPages = await getRegularPage(regular);

  // get posts folder slug for filtering
  const getPostSlug = getSinglePage(`content/${blog_folder}`);
  const postSlug = getPostSlug.map((item) => item.slug);
  // aughor data
  const authors = getSinglePage("content/authors");
  // all single pages
  const posts = getSinglePage(`content/${blog_folder}`);

  return {
    props: {
      slug: regular,
      data: allPages,
      postSlug: postSlug,
      authors: authors,
      posts: posts,
    },
  };
};
*/