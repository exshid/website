const EditorPickCenter = ({ items }) => {
    return (
      <div className="bg-white p-4 w-2/4">
        {items.slice(0, 1).map((item) => (
          <div key={Math.random()}>
            <img src={item.image} alt={item.title} className="object-cover p-3 w-full h-[26rem] rounded-lg"/>
            <div className="font-bold p-3 text-black text-3xl">{item.title}</div>
            <div className="text-gray-500 p-3">{item.description}</div>
            <div className="text-gray-500 p-3">{item.author}</div>
          </div>
        ))}
      </div>
    );
  };
  

  export default EditorPickCenter;
  