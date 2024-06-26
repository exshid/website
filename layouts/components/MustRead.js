import Image from 'next/image'
import Link from 'next/link';

const MustRead = ({items}) => {


  return (
<div className="flex divide-x p-3 md:py-4 xl:px-6 2xl:px-20 overflow-y-hidden	overflow-x-scroll lg:overflow-x-hidden">
                  {items.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};


const ArticleCard = ({ image, title, description, author, id }) => {
  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="flex flex-col">
        <div className="h-72 w-80 relative">
        <Image
          className="h-full w-full object-cover relative"
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"/>
            </div>
          <div className="pt-8">
          <Link href={`/posts/${id}`}>

           <h3 className="text-lg font-bold text-black hover:text-gray-500 hover:underline">
            {title}
          </h3>
          </Link >

              <p className="my-2 text-gray-500">{description}</p>
              
          <Link href={`/authors/${author}`}>
          <span className="mt-2 text-gray-500 hover:underline hover:text-black">{author}
          </span>
          </Link>

        </div>
      </div>
    </div>
  );
};


export default MustRead;