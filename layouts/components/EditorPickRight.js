import Link from 'next/link';


const EditorPickRight = ({ items }) => {
    return (
<div className="w-1/4 pt-4 divide-y">
  {items.slice(0, 3).map((item, index) => (
    <div key={index} className="bg-white p-4">
      <Link href={item.id}>

      <h3 className="font-bold text-black text-xl">{item.title}</h3>
      </Link>

      <p className="text-gray-500">
        {item.description.length > 131 
          ? `${item.description.substring(0, 131)}...` 
          : item.description}
      </p>
      <span className="text-gray-500">{item.author}</span>
    </div>
  ))}
</div>
    );
  };
  
export default EditorPickRight;
