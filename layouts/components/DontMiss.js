const DontMiss = ({ items, headline }) => {
    return (
      <div className="p-6 md:w-1/2">
        <div className="flex items-baseline">
          <span className="text-gray-600 font-semibold">{headline}</span>
          <span className="ml-2 text-sm text-gray-500">{items.length} articles</span>
        </div>
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={Math.random()} className="flex items-start space-x-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.description}</h3>
                <p className="mt-2 text-lg text-gray-700 font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500">{item.author}</p>
              </div>
              <img className="h-16 w-16 object-cover rounded" src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DontMiss;  