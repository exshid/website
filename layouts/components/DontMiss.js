import Link from 'next/link';

const DontMiss = ({ items, headline }) => {
    return (
      <div className="p-6 md:w-1/2">
        <div className="flex items-baseline">
          <span className="text-gray-600 font-semibold">{headline}</span>
          <span className="ml-2 text-sm text-gray-500">{items.length} articles</span>
        </div>
        <ul className="mt-4 space-y-4">
          {items.slice(0, 4).map((item) => (
            <li key={item.id} className="flex items-start space-x-4">
              <div className="flex">
            <p className="text-sm font-medium text-gray-900">{item.description}</p>

<Link href={item.id}>
                <h3 className="mt-2 text-lg text-gray-700 font-bold">{item.title}</h3>
    </Link>
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