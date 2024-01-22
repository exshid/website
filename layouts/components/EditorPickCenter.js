import Image from 'next/image'
import Link from 'next/link';

const EditorPickCenter = ({ items }) => {
    return (
      <div className="bg-white lg:p-4 w-full lg:w-2/4">
        {items.slice(0, 1).map((item) => (
          <div key={item.id} className="flex flex-col-reverse lg:flex-col">
            <Image src={item.image} alt={item.title} className="object-cover p-4 w-full h-[26rem] rounded-lg relative"/>
           <div className="flex flex-col"> 
           <Link href={`/posts/${item.id}`}>
            <h1 className="font-bold p-4 text-black transition hover:underline hover:text-gray-500 text-2xl md:text-3xl lg:text-4xl">{item.title}</h1>
            </Link>
            <div className="text-gray-500 text-lg px-4">{item.description}</div>
            <Link href={`/authors/${item.author}`}> 
            <span className="text-black font-bold hidden lg:block text-lg p-4 hover:underline hover:text-gray-500">{item.author}</span>
            </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  export default EditorPickCenter;
  