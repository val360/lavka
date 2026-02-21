import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Headphones, Shield } from 'lucide-react';
import { subscribeNewsletter } from '../api/client';

const FEATURES = [
  { icon: Truck, title: 'Free shipping', desc: 'Free shipping on all US orders above $99.99' },
  { icon: RotateCcw, title: 'Easy returns', desc: 'Easy returns or exchanges within 30 days of purchase' },
  { icon: Headphones, title: 'Customer support', desc: 'Available 8am-5pm (ET) Monday-Friday' },
  { icon: Shield, title: 'Secure check-out', desc: '100% secure and convenient payments' },
];

const FOOTER_LINKS = {
  'Customer Service': [
    { label: 'Shipping & Delivery', to: '/pages/shipping-delivery' },
    { label: 'Returns & Exchange', to: '/pages/returns-exchange' },
    { label: 'FAQ', to: '/pages/faq' },
    { label: 'Contact Us', to: '/pages/contact-us' },
  ],
  'About': [
    { label: 'About 945 Industries', to: '/pages/about-us' },
    { label: 'Reviews', to: '/pages/reviews' },
  ],
  'Shop': [
    { label: 'Bags', to: '/collections/bags' },
    { label: 'Holsters', to: '/collections/holsters' },
    { label: 'Accessories', to: '/collections/accessories' },
    { label: 'Bundles', to: '/collections/bundles' },
    { label: 'Gift Cards', to: '/collections/gift-cards' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const { data } = await subscribeNewsletter(email);
      setMessage(data.message);
      setEmail('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <footer className="bg-brand-dark">
      {/* Features Bar */}
      <div className="border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start space-x-3">
              <f.icon size={24} className="text-brand-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">{f.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-10 border-b border-white/10">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-heading text-lg uppercase tracking-wider mb-2">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Sign up to receive exclusive offers and product updates</p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-brand-black border border-white/20 rounded-l px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent text-sm"
              required
            />
            <button type="submit" className="bg-white text-black px-6 py-2.5 rounded-r font-semibold uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </form>
          {message && <p className="text-brand-accent text-sm mt-2">{message}</p>}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4 text-brand-accent">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} 945industries. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to="/pages/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/pages/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/pages/shipping-policy" className="hover:text-white">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
