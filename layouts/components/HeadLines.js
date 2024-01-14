const HeadLines = ({ items }) => {
    return (
      <div className="flex flex-wrap justify-between p-4 px-20">
        <h2 className="w-full text-2xl font-bold mb-4">PODCASTS</h2>
        <div className="divide-x flex flex-wrap justify-between">
          {items.slice(0, 4).map((podcast) => (
            <div key={Math.random()} className="w-full sm:w-1/2 lg:w-1/4 py-2">
              <div className="py-4 rounded-lg flex">
                <img src={podcast.image} alt={podcast.title} className="w-full h-32 px-3 rounded-sm object-cover mb-2"/>
                <div>
                  <h3 className="text-lg font-bold mb-1">{podcast.title}</h3>
                  <p className="text-xs text-gray-400 mt-2">{podcast.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HeadLines;
  