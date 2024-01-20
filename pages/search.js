import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Search results:', data);
          setResults(data);
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search</h1>
      <SearchBar onSearch={(q) => router.push(`/search?q=${q}`)} />
      <ul>
        {results.map((result) => (
          <li key={result._id}>{result.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;