import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'BAGS', to: '/collections/bags' },
  { label: 'HOLSTERS', to: '/collections/holsters' },
  { label: 'ACCESSORIES', to: '/collections/accessories' },
  { label: 'BUNDLES', to: '/collections/bundles' },
  { label: 'GIFT CARDS', to: '/collections/gift-cards' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-widest uppercase">
            945industries
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium tracking-wider uppercase hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-brand-accent transition-colors">
              <Search size={20} />
            </button>
            <Link to={isAuthenticated ? '/account' : '/login'} className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <Link to="/cart" className="p-2 hover:text-brand-accent transition-colors relative">
              <ShoppingBag size={20} />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-white/10">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-brand-dark border border-white/20 rounded-l px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent"
                autoFocus
              />
              <button type="submit" className="bg-white text-black px-6 py-2 rounded-r font-medium uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-brand-black">
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-brand-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-brand-dark transition-colors"
            >
              {isAuthenticated ? 'ACCOUNT' : 'LOGIN'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
