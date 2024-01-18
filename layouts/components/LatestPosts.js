import Image from 'next/image'
import Link from 'next/link';

const LatestPosts = ({ items }) => {
    return (
      <div className="w-full lg:w-3/4 lg:pr-20 divide-y">
        {items.map((item) => (
          <div key={Math.random()} className="flex">
            <Link href={item.id}>
              <h3 className="font-semibold text-lg md:text-xl lg:text-2xl pt-2">{item.title}</h3>
              </Link>
<div>
            <Image src={item.image} alt={item.title}
            className="object-cover !relative lg:p-4 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"

                    objectFit="cover"/>
             <div>
              <p className="py-2 text-black text-sm">{item.description}</p>
            <div>
              <span className="text-sm font-bold text-black">{item.author}</span>
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default LatestPosts