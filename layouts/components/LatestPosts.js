import Image from 'next/image'
import Link from 'next/link';

const LatestPosts = ({ items }) => {
    return (
      <div className="w-3/4 pr-20 divide-y">
        {items.map((item) => (
          <div key={Math.random()} className="flex">
            <Image src={item.image} alt={item.title} className="object-cover !relative p-4 w-80 h-64 rounded-lg"

                    objectFit="cover"/>
            <div>
            <Link href={item.id}>
              <h3 className="font-semibold text-2xl pt-2">{item.title}</h3>
</Link>
              <p className="py-2">{item.description}</p>
              <p className="text-sm text-gray-500">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default LatestPosts