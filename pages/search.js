import Base from "@layouts/Baseof";
import Posts from "@layouts/partials/Posts";
import { getSinglePage } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";


const SearchPage = ({ authors, rweets }) => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key);

  const searchResults = rweets.filter((product) => {
    if (product.frontmatter.draft) {
      return !product.frontmatter.draft;
    }
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (product.frontmatter.categories.find((category) => slugify(category).includes(keyword))) {
      return product;
    } else if (product.frontmatter.tags.find((tag) => slugify(tag).includes(keyword))) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  return (
    <Base title={`Search results for ${query.key}`}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Search results for <span className="text-primary">{query.key}</span>
          </h1>
          {searchResults.length > 0 ? (
            <Posts posts={searchResults} authors={authors} />
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              No Search Found
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default SearchPage;

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rweets = await tweetsCollection.find().toArray();
  client.close();

  const authors = getSinglePage("content/authors");

  return {
    props: {
      authors: authors,
      rweets: rweets,
    },
  };
};