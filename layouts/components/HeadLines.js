import Image from 'next/image'
import Link from 'next/link';

const HeadLines = ({ items }) => {
    return (
      <div className="flex flex-wrap justify-between p-4 px-20">
        <h2 className="w-full text-2xl font-bold mb-4">PODCASTS</h2>
        <div className="divide-x flex flex-wrap justify-between">
          {items.slice(0, 3).map((podcast) => (
            <div key={Math.random()} className="w-full sm:w-1/2 lg:w-1/3 py-2">
              <div className="py-4 rounded-lg flex">
                <div className="px-4">
                <Image src={podcast.image} alt={podcast.title}
                className="h-24	h-28 relative rounded-sm object-cover mb-2"
                objectFit="cover"/>
                </div>
                <div>
                <Link href={podcast.id}>

                  <h3 className="text-lg font-bold mb-1">{podcast.title}</h3>
</Link>
                  <span className="text-xs text-gray-400 mt-2">{podcast.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HeadLines;
  