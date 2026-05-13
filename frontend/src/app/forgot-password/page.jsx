'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Forgot Password Page Component
 * Allows users to request a password reset link via email.
 * Connects to the backend auth/forgot-password endpoint.
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-dim text-on-surface font-body-md overflow-hidden min-h-screen flex items-center justify-center p-6 bg-[#0e0e0e]">
      <div className="w-full max-w-md glass-card p-12 rounded-3xl shadow-2xl border border-white/5 relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent blur-2xl opacity-50 -z-10"></div>
        
        <header className="mb-10 text-center">
          <Link href="/">
            <span className="text-red-600 font-black italic tracking-tighter text-3xl font-h1-hero cursor-pointer uppercase block mb-8">CineReview</span>
          </Link>
          <h2 className="text-3xl text-white mb-2 font-bold uppercase tracking-tight">Reset Password</h2>
          <p className="text-slate-500 text-sm font-medium">Enter your email and we'll send you a reset link.</p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-600/20 border border-green-600/50 text-green-500 p-4 rounded-xl text-sm font-bold text-center">
              {message}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">mail</span>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all outline-none" 
                placeholder="your@email.com" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-red-900/20 active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center disabled:opacity-50" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Remembered your password? 
            <Link href="/login" className="text-red-600 font-bold hover:underline ml-2 uppercase tracking-tight">Login</Link>
          </p>
        </footer>
      </div>

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[40%] w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </div>
  );
}
