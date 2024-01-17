import Image from 'next/image'
import Link from 'next/link';

const MustRead = ({items}) => {


  return (
<div className="flex flex-wrap divide-x px-20">
                  {items.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};


const ArticleCard = ({ image, title, description, author }) => {
  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="flex flex-col">
        <div className="h-72 h-72">
        <Image
          className="h-full w-full object-cover"
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"/>
      </div>
        <div className="pt-8">
        <Link href={id}>

          <h3 className="text-lg font-bold text-black">
            {title}
          </h3>
          </Link >

              <p className="mt-2 text-gray-500">{description}</p>
          <span className="mt-2 text-gray-700">By {author}</span>
        </div>
      </div>
    </div>
  );
};


export default MustRead;