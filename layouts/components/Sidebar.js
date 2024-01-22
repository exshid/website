import Image from 'next/image'
import Link from 'next/link';

const Sidebar = ({ items, category }) => {
    return (
      <div className="flex flex-col p-3 lg:w-1/4 divide-y">
        {items.map((article) => (
          <div key={Math.random()} className="flex justify-between items-start p-2">
            <div className="flex-1 space-y-2">
            <Link href={article.id}>

              <h3 className="font-bold text-black hover:text-gray-500 hover:underline text-lg">{article.title}</h3>
</Link>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
 export default Sidebar;