import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;
import { MongoClient } from 'mongodb'

const Categories = ({ categories }) => {
  return (
    <Base title={"categories"}>
      <section className="section">
        <div className="container text-center">
          <ul className="space-x-4">
            {categories.map((category, i) => (
              <li key={`category-${i}`} className="inline-block">
                <Link
                  href={`/categories/${category}`}
                  className="rounded-lg bg-theme-light px-4 py-2 text-dark transition hover:bg-primary hover:text-white"
                >
                  &#8226; {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Categories;

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://ali:Ar7iy9BMcCLpXE4@cluster0.hi03pow.mongodb.net/tweets?retryWrites=true&w=majority')
  const db = client.db()
  const tweetsCollection = db.collection('rweets');
  const rawTweets = await tweetsCollection.find().toArray();
  const rweets = rawTweets.map((tweet) => JSON.parse(tweet.content));

  const allCategories = rweets.flatMap((tweet) => tweet.cats);
  const categories = [...new Set(allCategories)]; // Extract unique categories

  client.close()

  return {
    props: {
      categories: categories,
    },
  };
};
