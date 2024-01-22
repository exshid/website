import Link from 'next/link';
import Image from 'next/image'

const DontMiss = ({ items, category }) => {
    return (
      <div className="px-4 py-3 lg:p-6 lg:w-1/2">
        <div className="flex items-baseline">
          <span className="text-black hover:text-gray-500 hover:underline font-semibold uppercase"><Link href={`/categories/${category}`}>
{category}
</Link></span>
        </div>
        <ul className="mt-4 space-y-4">
        {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between space-x-4">
              <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900">{item.description}</p>

<Link href={`/posts/${item.id}`}>
                <h3 className="mt-2 text-lg font-bold text-black hover:text-gray-500 hover:underline">{item.title}</h3>
    </Link>
    <Link href={`/authors/${item.author}`}>
                <span className="mt-1 text-sm text-gray-500 hover:text-black hover:underline">{item.author}</span>
    </Link>
              </div>
              <Image className="h-16 w-16 object-cover rounded" src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DontMiss;