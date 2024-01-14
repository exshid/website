const EditorPickRight = ({ items }) => {
    return (
      <div className="w-1/4 pt-4 divide-y">
        {items.slice(0, 3).map((item) => (
          <div key={Math.random()} className="bg-white p-4">
            <div className="font-bold text-black">{item.title}</div>
            <div className="text-gray-500">{item.description}</div>
            <div className="text-gray-500">{item.author}</div>
          </div>
        ))}
      </div>
    );
  };
  
export default EditorPickRight;
