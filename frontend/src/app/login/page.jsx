'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Login Page Component
 * Provides a secure entry point for users.
 * Features:
 * - Email/Password authentication.
 * - Password visibility toggle.
 * - Persistent session storage (localStorage).
 * - Responsive cinematic design.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and user, then redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/browse');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-dim text-on-surface font-body-md overflow-hidden min-h-screen">
      <main className="flex min-h-screen w-full">
        {/* Left Side: High-Impact Cinematic Visual */}
        <section className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-20">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWpIf56nyRRg6zR-rT30LZCLKJH1Ftn1zq6jyAq2-_dpyDHMg1JzyI7qbnRttSomF8YLE7faSBssdyHattC-q8w23Ld-yBEOIPD_sgyoqEGsq4H2EHRnuSu29mtRmxgu9aLmbQDfr49hXusfD5o4FiVVqX3e1mKro_xVROJVVYlL-Ow5-Qb3pdH3hvAiwcwHOMXqba-ptxB0LmaN_NmEw2Uk_oCZKfz_ZlnFr5axzpbnB8CpO54UDNrppEZiXQEeDEAi1mm1yw1eY" 
              alt="Cinematic Background"
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent"></div>
          </div>
          
          <div className="relative z-20 flex flex-col h-full justify-between">
            <div>
              <Link href="/">
                <span className="text-red-600 font-black italic tracking-tighter text-4xl font-h1-hero cursor-pointer uppercase">CineReview</span>
              </Link>
            </div>
            <div className="max-w-2xl mt-auto mb-20">
              <h1 className="font-h1-hero text-5xl lg:text-7xl text-white mb-8 leading-tight font-extrabold uppercase tracking-tighter">
                Your AI-Powered <br/>
                <span className="text-red-600 drop-shadow-[0_0_20px_rgba(229,9,20,0.5)]">Movie Companion.</span>
              </h1>
            </div>
            <div className="mt-auto">
              <p className="text-slate-400 font-body-md text-sm uppercase tracking-widest font-bold">Join 2M+ movie enthusiasts</p>
            </div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full lg:w-[45%] flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 relative bg-[#0e0e0e]">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-8 left-8">
            <Link href="/">
              <span className="text-red-600 font-black italic tracking-tighter text-2xl font-h1-hero uppercase">CineReview</span>
            </Link>
          </div>

          <div className="w-full max-w-md glass-card p-12 rounded-3xl shadow-2xl border border-white/5 relative z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent blur-2xl opacity-50 -z-10"></div>
            
            <header className="mb-10 text-center">
              <h2 className="text-3xl text-white mb-2 font-bold uppercase tracking-tight">Welcome Back</h2>
              <p className="text-slate-500 text-sm font-medium">Sign in to continue your movie journey.</p>
            </header>

            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-600/20 border border-red-600/50 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
                  {error}
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

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
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

              <div className="flex justify-between items-center py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-red-600/50 transition-all">
                    <input type="checkbox" className="hidden peer" />
                    <span className="material-symbols-outlined text-[16px] text-red-600 opacity-0 peer-checked:opacity-100 transition-all">check</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                </label>
                <Link className="text-xs font-bold text-red-600 hover:text-red-500 transition-colors uppercase tracking-tight" href="/forgot-password">Forgot Password?</Link>
              </div>

              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-red-900/20 active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center disabled:opacity-50" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#0e0e0e] px-4 text-slate-600 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <img 
                  alt="Google" 
                  className="w-5 h-5 group-hover:scale-110 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI-2JwP-csKNYxX6ohw6IrzcLFtqn-lTkplxDO_1Usl5iyi2hwYLVpYDEWcm6Z4oIAYvwFjqKYZ46K_RGxZYUEKEEBxt3 মঞ্জurSCUmQfh_RF2-1cXzU2ukt9eSXPkbHWtE7QTjC15o4hd2NdsJWRtIprR72aK5LHTW5dmHJlihsE3LaSjxp12hTTfDKBs693HAztQ" 
                />
              </button>
              <button className="flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>apple</span>
              </button>
              <button className="flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-black text-lg group">
                <span className="group-hover:scale-110 transition-transform">X</span>
              </button>
            </div>

            <footer className="mt-10 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account? 
                <Link href="/signup" className="text-red-600 font-bold hover:underline ml-2 uppercase tracking-tight">Sign Up</Link>
              </p>
            </footer>
          </div>
        </section>
      </main>

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[40%] w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </div>
  );
}
