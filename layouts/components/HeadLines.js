import Image from 'next/image'
import Link from 'next/link';

const HeadLines = ({ items, category }) => {
    return (
      <div className="flex flex-wrap justify-between p-3 md:py-4 xl:px-6 2xl:px-20">
        <Link className="w-full" href={`/categories/${category}`}>
        <h2 className="w-full text-3xl text-black hover:text-gray-500 hover:underline mb-3 uppercase pl-3">
          {category}
          </h2>
          </Link>

        <div className="flex flex-wrap justify-between flex-col lg:flex-row">
        {items.map((item) => (
            <div key={Math.random()} className="w-full lg:w-1/3 lg:py-2">
              <div className="py-2 lg:py-4 rounded-lg flex">
                <div className="pl-3 pr-5 w-1/3">
                <Image src={item.image} alt={item.title}
                className="w-full	h-28 relative rounded-sm object-cover mb-2"
                objectFit="cover"/>
                </div>
                <div className="w-2/3">
                <Link href={item.id}>
                  
                  <h3 className="text-lg font-bold text-black hover:text-gray-500 hover:underline mb-1">{item.title}</h3>
                </Link>
                <Link href={`/authors/${item.author}`}>
                  <span className="text-xs mt-2 text-black hover:text-gray-500 hover:underline">{item.author}</span>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HeadLines;
  