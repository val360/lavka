import { useState } from 'react';
import { submitContact } from '../api/client';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await submitContact(form);
      setStatus(data.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="section-heading mb-4">Contact Us</h1>
      <p className="text-gray-400 text-center mb-10">
        We are available to answer any questions 8am-5pm (Eastern Time) Monday-Friday
      </p>

      {status && (
        <div className="bg-brand-dark border border-brand-accent/30 text-brand-accent px-4 py-3 rounded mb-6 text-sm text-center">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required
              className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} required
            className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
            className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent resize-none" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
