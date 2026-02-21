import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUser(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="section-heading mb-8">Create Account</h1>

      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required
              className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required
              className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
            className="w-full bg-brand-dark border border-white/20 rounded px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent" />
          <p className="text-gray-500 text-xs mt-1">Must be at least 6 characters</p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
