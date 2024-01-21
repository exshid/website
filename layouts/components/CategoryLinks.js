import Link from 'next/link';

const CategoryLinks = ({ items }) => {
    return (
      <div className="w-full hidden md:flex justify-center border-y">
      <div className="flex space-x-5 py-3 w-3/4 justify-center">
        {items.map((item) => {
          return (
            <Link key={Math.random()} href={`/categories/${item}`} className="text-[.9rem] font-bold text-black hover:text-gray-500 hover:underline">
              {item}             
            </Link>
          );
        })}
      </div>
      </div>
    );
  };
  
  export default CategoryLinks;