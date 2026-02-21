import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What materials are your bags made from?',
    a: 'Our bags are primarily constructed from 500D CORDURA® nylon and X-Pac® laminated fabrics, both known for exceptional durability, water resistance, and lightweight performance.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes! We offer free shipping on all US orders above $99.99. International shipping rates vary by destination.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer easy returns or exchanges within 30 days of purchase. Items must be in original, unused condition with all tags attached.',
  },
  {
    q: 'What holster types do you offer?',
    a: 'We offer both IWB (Inside-the-Waistband) adapter holsters and custom-molded Kydex holster inserts. Both are designed for secure retention and quick access.',
  },
  {
    q: 'Are your bags ambidextrous?',
    a: 'Yes, our concealment bags feature an ambidextrous design, allowing both left and right-handed users to access the concealment compartment efficiently.',
  },
  {
    q: 'Where are your products manufactured?',
    a: 'We proudly operate a U.S.-based production facility in Georgia. All our products are designed and manufactured domestically.',
  },
  {
    q: 'How do I choose the right bag size?',
    a: 'We offer Small, Large, and X-Large sizes. Small is ideal for subcompact pistols, Large fits most compact pistols, and X-Large accommodates full-size firearms. Check individual product pages for specific dimensions.',
  },
  {
    q: 'Do you offer gift cards?',
    a: 'Yes! We offer digital gift cards in $25, $50, and $100 denominations. They are delivered via email and can be used on any product in our store.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="section-heading mb-10">Frequently Asked Questions</h1>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-brand-dark rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-gray/50 transition-colors"
            >
              <span className="font-medium text-sm pr-4">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
