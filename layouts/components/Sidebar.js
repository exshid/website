const Sidebar = ({ items }) => {
    return (
      <div className="flex flex-col w-1/4 divide-y">
        {items.slice(0, 6).map((article) => (
          <div key={Math.random()} className="flex justify-between items-start p-2">
            <div className="flex-1 space-y-2">
              <h2 className="font-bold text-lg">{article.title}</h2>
            </div>
            <img className="w-32 h-20 object-cover" src={article.image} alt={article.title} />
          </div>
        ))}
      </div>
    );
  };
  
 export default Sidebar;