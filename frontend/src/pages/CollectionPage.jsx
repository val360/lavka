import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, getCategoryBySlug } from '../api/client';

export default function CollectionPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProductsByCategory(slug),
      getCategoryBySlug(slug),
    ])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data);
        setCategory(catRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="section-heading">{category?.name || slug}</h1>
        {category?.description && (
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">{category.description}</p>
        )}
        <p className="text-gray-500 text-sm mt-2">{products.length} product{products.length !== 1 ? 's' : ''}</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products found in this collection.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
