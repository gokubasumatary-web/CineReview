'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Reset Password Page Component
 * Allows users to set a new password using a token from their email.
 * Includes token validation and password match checking.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
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
          <h2 className="text-3xl text-white mb-2 font-bold uppercase tracking-tight">Set New Password</h2>
          <p className="text-slate-500 text-sm font-medium">Please enter your new password below.</p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-600/20 border border-green-600/50 text-green-500 p-4 rounded-xl text-sm font-bold text-center">
              {message}. Redirecting to login...
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">lock</span>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all outline-none" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">lock_reset</span>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all outline-none" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-red-900/20 active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center disabled:opacity-50" 
            type="submit"
            disabled={isLoading || !token}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Back to 
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
