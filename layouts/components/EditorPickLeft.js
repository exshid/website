import Link from 'next/link';

const EditorPickLeft = ({ items }) => {
    return (
      <div className="w-full lg:w-1/4 pt-4 divide-y">
        {items.slice(0, 5).map((item) => {
          return (
            <div key={Math.random()} className="bg-white p-4">
                <Link href={item.id}>

              <h3 className="font-bold text-black text-xl">{item.title}</h3>
</Link>
              <span className="hidden lg:inline-block text-gray-500">{item.author}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
export default EditorPickLeft;  