import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-heading mb-10">About 945 Industries</h1>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <div className="bg-brand-dark rounded-lg p-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white mb-4">Our Mission</h2>
          <p>
            At 945 Industries, we design and manufacture premium concealed carry bags, holsters, and accessories.
            Every product is crafted with a focus on durability, comfort, and discretion — meeting the demanding
            needs of everyday carry enthusiasts.
          </p>
        </div>

        <div className="bg-brand-dark rounded-lg p-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white mb-4">Made in the USA</h2>
          <p>
            We proudly operate a U.S.-based production facility in Georgia. Our commitment to domestic manufacturing
            ensures the highest quality control standards and supports American craftsmanship.
          </p>
        </div>

        <div className="bg-brand-dark rounded-lg p-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white mb-4">Premium Materials</h2>
          <p>
            We use only the finest materials in our products, including 500D CORDURA® nylon, X-Pac® laminated fabrics,
            and custom-molded Kydex holsters. Every material is selected for its proven performance in demanding conditions.
          </p>
        </div>

        <div className="bg-brand-dark rounded-lg p-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white mb-4">Our Promise</h2>
          <ul className="space-y-2">
            <li>• Free shipping on all US orders above $99.99</li>
            <li>• Easy returns or exchanges within 30 days</li>
            <li>• Customer support available 8am-5pm ET, Monday-Friday</li>
            <li>• 100% secure checkout</li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <Link to="/collections/bags" className="btn-primary">Shop Our Products</Link>
        </div>
      </div>
    </div>
  );
}
