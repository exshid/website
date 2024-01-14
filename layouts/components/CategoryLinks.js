import Link from 'next/link';

const CategoryLinks = ({ items }) => {
    return (
      <div className="flex space-x-4 px-80 py-3 w-full justify-between border-y">
        {items.map((item) => {
          const href = item.toLowerCase().split(' ').join('-');
          return (
            <Link key={Math.random()} href={`/${href}`}>
              <a className="text-xs font-medium text-gray-600 hover:text-gray-900">
                {item}
              </a>
            </Link>
          );
        })}
      </div>
    );
  };
  
  export default CategoryLinks;