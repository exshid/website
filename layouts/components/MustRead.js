const MustRead = () => {


  return (
<div className="flex flex-wrap divide-x px-20">
                  {items.slice(0, 4).map((article) => (
        <div className="w-full md:w-1/4 p-4">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};


const ArticleCard = ({ image, title, description, author }) => {
  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="flex flex-col">
        <div className="h-72 w-full">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={title}
        />
        </div>
        <div className="py-8">
          <div className="text-lg font-bold text-black">
            {title}
          </div>
              <p className="mt-2 text-gray-500">{description}</p>
          <p className="mt-2 text-gray-700">By {author}</p>
        </div>
      </div>
    </div>
  );
};


export default MustRead;