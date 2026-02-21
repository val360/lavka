import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../api/client';

const CATEGORIES = [
  { name: 'BAGS', slug: 'bags', desc: 'Premium concealed carry bags' },
  { name: 'HOLSTERS', slug: 'holsters', desc: 'Secure holster solutions' },
  { name: 'ACCESSORIES', slug: 'accessories', desc: 'Essential carry accessories' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then(({ data }) => setFeatured(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-brand-black" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-4">
            945 Industries
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Premium Concealed Carry Bags, Holsters & Accessories
          </p>
          <p className="text-brand-accent text-sm uppercase tracking-widest font-medium mb-8">
            We operate a U.S.-based production facility in Georgia
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections/bags" className="btn-primary">
              Explore Bags
            </Link>
            <Link to="/collections/holsters" className="btn-outline">
              Shop Holsters
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/collections/${cat.slug}`}
              className="group relative bg-brand-dark rounded-lg overflow-hidden aspect-[4/3] flex items-end p-6 hover:ring-2 hover:ring-brand-accent transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wider mb-1">{cat.name}</h3>
                <div className="flex items-center text-brand-accent text-sm font-medium">
                  SHOP <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bundles + Gift Cards Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/collections/bundles"
            className="group bg-brand-dark rounded-lg p-8 flex flex-col justify-center items-center text-center hover:ring-2 hover:ring-brand-accent transition-all"
          >
            <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-2">Bundles</h3>
            <p className="text-gray-400 text-sm mb-4">Save more with curated sets</p>
            <span className="btn-outline text-xs">SHOP NOW</span>
          </Link>
          <Link
            to="/collections/gift-cards"
            className="group bg-brand-dark rounded-lg p-8 flex flex-col justify-center items-center text-center hover:ring-2 hover:ring-brand-accent transition-all"
          >
            <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-2">Gift Cards</h3>
            <p className="text-gray-400 text-sm mb-4">Give the gift of choice</p>
            <span className="btn-outline text-xs">SHOP NOW</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-heading mb-10">Featured Items</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* About Banner */}
      <section className="bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
            The Ultimate Guide to Choosing the Perfect Concealed Carry Fanny Pack
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Crafted for durability, comfort, and discretion, our products are designed to meet your everyday carry needs.
          </p>
          <Link to="/pages/about-us" className="btn-primary">Learn More</Link>
        </div>
      </section>
    </div>
  );
}
