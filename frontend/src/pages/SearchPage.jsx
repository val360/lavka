import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../api/client';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    searchProducts(query)
      .then(({ data }) => setResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="section-heading mb-2">Search Results</h1>
      <p className="text-gray-400 text-center mb-10">
        {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
      </p>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Searching...</div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-20 text-gray-500">No products found for "{query}"</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
