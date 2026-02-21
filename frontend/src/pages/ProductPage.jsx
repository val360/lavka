import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, ChevronLeft } from 'lucide-react';
import { getProductBySlug } from '../api/client';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(({ data }) => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>;

  const placeholderImg = `https://placehold.co/600x600/1a1a1a/ffffff?text=${encodeURIComponent(product.name.substring(0, 20))}`;
  const imgSrc = product.imageUrls?.[0]?.startsWith('http') ? product.imageUrls[0] : placeholderImg;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to={product.categorySlug ? `/collections/${product.categorySlug}` : '/'}
          className="text-gray-400 hover:text-white text-sm flex items-center"
        >
          <ChevronLeft size={16} />
          Back to {product.categoryName || 'Shop'}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-brand-dark rounded-lg overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = placeholderImg; }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {product.categoryName && (
            <p className="text-brand-accent text-xs uppercase tracking-widest font-medium mb-2">
              {product.categoryName}
            </p>
          )}

          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
            {product.name}
          </h1>

          <div className="flex items-center space-x-3 mb-6">
            <span className="text-2xl font-bold">${product.price?.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-500 line-through">${product.compareAtPrice?.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            {product.color && (
              <div>
                <span className="text-gray-500">Color:</span>
                <span className="ml-2 font-medium">{product.color}</span>
              </div>
            )}
            {product.size && (
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-2 font-medium">{product.size}</span>
              </div>
            )}
            {product.material && (
              <div className="col-span-2">
                <span className="text-gray-500">Material:</span>
                <span className="ml-2 font-medium">{product.material}</span>
              </div>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-white/20 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-brand-dark transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-white/20 min-w-[48px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-brand-dark transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded font-semibold uppercase text-sm tracking-wider transition-all ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Shipping Note */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 text-xs">
              {product.price >= 99.99
                ? '✓ Free shipping on this item'
                : 'Free shipping on orders above $99.99'}
            </p>
            <p className="text-gray-500 text-xs mt-1">Easy returns within 30 days</p>
          </div>

          {product.stockQuantity !== undefined && product.stockQuantity <= 10 && product.stockQuantity > 0 && (
            <p className="text-brand-accent text-sm mt-3 font-medium">
              Only {product.stockQuantity} left in stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
