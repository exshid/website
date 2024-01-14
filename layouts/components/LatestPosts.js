const LatestPosts = ({ items }) => {
    return (
      <div className="w-3/4 pr-20 divide-y">
        {items.map((item) => (
          <div key={Math.random()} className="flex">
            <img src={item.image} alt={item.title} className="object-cover p-3 h-52 rounded-lg"/>
            <div>
              <h3 className="font-semibold text-2xl pt-2">{item.title}</h3>
              <p className="py-2">{item.description}</p>
              <p className="text-sm text-gray-500">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default LatestPosts