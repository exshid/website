const EditorPickLeft = ({ items }) => {
    return (
      <div className="w-1/4 pt-4 divide-y">
        {items.slice(0, 5).map((item) => {
          return (
            <div key={Math.random()} className="bg-white p-4">
              <div className="font-bold text-black">{item.title}</div>
              <div className="text-gray-500">{item.author}</div>
            </div>
          );
        })}
      </div>
    );
  };
  
export default EditorPickLeft;  