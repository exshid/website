import Image from 'next/image'
import Link from 'next/link';

const EditorPickCenter = ({ items }) => {
    return (
      <div className="bg-white p-4 w-2/4">
        {items.slice(0, 1).map((item) => (
          <div key={Math.random()}>
            <Image src={item.image} alt={item.title} className="object-cover p-3 w-full h-[26rem] rounded-lg relative"/>
            <Link href={item.id}>
            <h1 className="font-bold p-3 text-black text-4xl">{item.title}</h1>
</Link>
            <div className="text-gray-500 p-3">{item.description}</div>
            <div className="text-gray-500 p-3">{item.author}</div>
          </div>
        ))}
      </div>
    );
  };
  

  export default EditorPickCenter;
  