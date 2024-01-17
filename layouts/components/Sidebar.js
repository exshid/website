import Image from 'next/image'
import Link from 'next/link';

const Sidebar = ({ items }) => {
    return (
      <div className="flex flex-col w-1/4 divide-y">
        {items.slice(0, 6).map((article) => (
          <div key={Math.random()} className="flex justify-between items-start p-2">
            <div className="flex-1 space-y-2">
            <Link href={item.id}>

              <h3 className="font-bold text-lg">{article.title}</h3>
</Link>
            </div>
            <div className="w-24 h-20">
            <Image className="w-full h-full object-cover" src={article.image} alt={article.title}
            layout="fill"
            objectFit="cover"/>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
 export default Sidebar;