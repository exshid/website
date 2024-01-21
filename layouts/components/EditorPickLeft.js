import Link from 'next/link';

const EditorPickLeft = ({ items, category }) => {
    return (
      <div className="w-full lg:w-1/4 lg:pt-4 divide-y">
        {items.filter(item => item.cats.includes(category)).slice(0, 5).map((item) => {
          return (
            <div key={Math.random()} className="bg-white p-4 lg:p-1 xl:p-4">
                <Link href={`authors/${item.author}`}>

              <h3 className="font-bold text-black text-xl hover:underline hover:text-gray-500">{item.title}</h3>
</Link>
<Link href={item.author}>

              <span className="hidden lg:inline-block text-gray-500 hover:underline hover:text-black">{item.author}</span>
</Link>
            </div>
          );
        })}
      </div>
    );
  };
  
export default EditorPickLeft;  