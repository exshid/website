import Link from 'next/link';


const EditorPickRight = ({ items }) => {
    return (
<div className="w-full lg:w-1/4 lg:pt-4 divide-y">
  {items.slice(0, 3).map((item, index) => (
    <div key={index} className="bg-white p-4 lg:p-1 xl:p-4">
      <Link href={item.id}>

      <h3 className="font-bold text-black text-xl transition hover:underline hover:text-gray-500">{item.title}</h3>
      </Link>

      <p className="text-gray-500 py-1">
        {item.description.length > 131 
          ? `${item.description.substring(0, 131)}...` 
          : item.description}
      </p>
      <Link href={item.author}>
      <span className="text-black font-bold hover:underline hover:text-gray-500">{item.author}</span>
    </Link>
    </div>
  ))}
</div>
    );
  };
  
export default EditorPickRight;
