import { slugify } from "@lib/utils/textConverter";
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
                  href={`/categories/${category.href}`}
                  className="rounded-lg bg-theme-light px-4 py-2 text-dark transition hover:bg-primary hover:text-white"
                >
                  {category.label}
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
  const rweets = await tweetsCollection.find().toArray()
  
  const allCategories = rweets.reduce((acc, tweet) => {
    const cats = JSON.parse(tweet.cats); 
    return acc.concat(cats);
  }, []);
  const categories = [...new Set(allCategories)]; // Extract unique categories
  
  // Slugify the categories
  const slugifiedCategories = categories.map(category => ({
    label: category,
    href: slugify(category)
  }));
  
  client.close()
  
  return {
    props: {
      categories: slugifiedCategories,
    },
  };
  };
