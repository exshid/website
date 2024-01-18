import Image from 'next/image'
import Link from 'next/link';

const EditorPickCenter = ({ items }) => {
    return (
      <div className="bg-white lg:p-4 w-full lg:w-2/4">
        {items.slice(0, 1).map((item) => (
          <div key={Math.random()}>
            <Image src={item.image} alt={item.title} className="object-cover p-4 w-full h-[26rem] rounded-lg relative"/>
            <Link href={item.id}>
            <h1 className="font-bold p-4 text-black text-2xl md:text-3xl lg:text-4xl">{item.title}</h1>
</Link>
            <div className="text-gray-500 text-lg px-4">{item.description}</div>
            <div className="text-black font-bold text-lg p-4">{item.author}</div>
          </div>
        ))}
      </div>
    );
  };
  

  export default EditorPickCenter;
  