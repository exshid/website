import Image from 'next/image'
import Link from 'next/link';

const LatestPosts = ({ items }) => {
    return (
      <div className="w-full lg:w-3/4 xl:pr-20 divide-y">
        {items.map((item) => (
         <>
         <div key={Math.random()} className="flex flex-col lg:hidden">
         <Link href={item.id}>
           <h3 className="font-semibold text-lg md:text-xl lg:text-2xl pt-2">{item.title}</h3>
           </Link>
             <div className="flex flex-row-reverse">
         <Image src={item.image} alt={item.title}
         className="object-cover !relative lg:p-4 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"
          objectFit="cover"/>
          <div>
           <p className="py-2 text-black text-sm md:text-base">{item.description}</p>
         <div>
           <span className="text-sm font-bold text-black md:text-base">{item.author}</span>
         </div>
         </div>
         </div>
       </div>
         
         <div key={Math.random()} className="hidden lg:flex">
            <Image src={item.image} alt={item.title}
            className="object-cover !relative lg:px-4 lg:py-3 w-28 h-20 md:w-60 md:h-48 lg:w-80 lg:h-64 rounded-m"

                    objectFit="cover"/>
            <div>
            <Link href={item.id}>
              <h3 className="font-semibold text-lg md:text-xl lg:text-2xl pt-2">{item.title}</h3>
      </Link>
              <p className="py-2 text-black text-sm">{item.description}</p>
              <p className="text-sm font-bold text-black">{item.author}</p>
            </div>
          </div>
          </>
        ))}
      </div>
    );
  };
  
export default LatestPosts