import Link from 'next/link';

const CategoryLinks = ({ items }) => {
    return (
      <div className="w-full flex justify-center border-y">
      <div className="flex space-x-5 py-3 w-3/4 justify-center">
        {items.map((item) => {
          const href = item.toLowerCase().split(' ').join('-');
          return (
            <Link key={Math.random()} href={`/categories/${href}`} className="text-[.9rem] font-bold text-black hover:text-gray-900">
              {item}             
            </Link>
          );
        })}
      </div>
      </div>
    );
  };
  
  export default CategoryLinks;