import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, clear } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/collections/bags" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-heading mb-8">Your Cart</h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center bg-brand-dark rounded-lg p-4 gap-4">
            {/* Image */}
            <div className="w-20 h-20 bg-brand-gray rounded flex-shrink-0 overflow-hidden">
              {item.productImage && (
                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link to={`/products/${item.productSlug}`} className="text-sm font-medium hover:text-brand-accent transition-colors line-clamp-2">
                {item.productName}
              </Link>
              <p className="text-gray-400 text-sm mt-1">${item.price?.toFixed(2)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center border border-white/20 rounded">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={loading}
                className="p-1.5 hover:bg-brand-gray transition-colors disabled:opacity-50"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 py-1 text-sm min-w-[36px] text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={loading}
                className="p-1.5 hover:bg-brand-gray transition-colors disabled:opacity-50"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Line Total */}
            <div className="text-right w-20 flex-shrink-0">
              <p className="font-semibold text-sm">${item.lineTotal?.toFixed(2)}</p>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              disabled={loading}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-brand-dark rounded-lg p-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span>${cart.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Shipping</span>
            <span>{cart.shipping === 0 ? <span className="text-green-400">Free</span> : `$${cart.shipping?.toFixed(2)}`}</span>
          </div>
          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${cart.total?.toFixed(2)}</span>
          </div>
        </div>

        {cart.subtotal < 99.99 && (
          <p className="text-brand-accent text-xs mt-3">
            Add ${(99.99 - cart.subtotal).toFixed(2)} more for free shipping!
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="btn-primary flex-1 text-center">Checkout</button>
          <button onClick={clear} disabled={loading} className="btn-outline text-center text-xs">Clear Cart</button>
        </div>

        <Link to="/collections/bags" className="block text-center text-gray-400 text-sm mt-4 hover:text-white">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
