import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const placeholderImg = `https://placehold.co/400x400/1a1a1a/ffffff?text=${encodeURIComponent(product.name.substring(0, 20))}`;
  const imgSrc = product.imageUrls?.[0]?.startsWith('http') ? product.imageUrls[0] : placeholderImg;

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="aspect-square bg-brand-dark rounded-lg overflow-hidden mb-3">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = placeholderImg; }}
        />
      </div>
      <h3 className="text-sm font-medium leading-tight group-hover:text-brand-accent transition-colors line-clamp-2">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center space-x-2">
        <span className="text-sm font-semibold">${product.price?.toFixed(2)}</span>
        {product.compareAtPrice && (
          <span className="text-xs text-gray-500 line-through">${product.compareAtPrice?.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}
