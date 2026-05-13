'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
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
        {/* Left Side: Cinematic Visual */}
        <section className="hidden lg:flex lg:w-[50%] relative overflow-hidden flex-col justify-between p-20">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCDkDIs0kq7jnYz510MXvwJ8DBXHv6ZMSRdrHCHuTHvLXvkX2P3IUil1CcWWDWhuZ-PpvHpYTr5IqkZpEz7F-p8xJv4BX1p2s7cvqJsU4H6RdaWH2FOKvuAfeg2b7Iux8fYJJqMWTcnU5Fg2wgO6N1Br5K01VKvgxZmfiTK-7SneT7EuKz_qOi_5SXKA3je9HjlTk0h_etrMHHwnp_SKnatuIqQfvX6y31w3TBkA8s_cDdGshtY_o6pTWe9YA8CjNOpS_Aea15vg" 
              alt="Cinematic Background"
            />
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#131313] via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-20 flex flex-col h-full justify-between">
            <div>
              <Link href="/">
                <span className="text-red-600 font-black italic tracking-tighter text-4xl font-h1-hero cursor-pointer uppercase">CineReview</span>
              </Link>
            </div>
            <div className="max-w-xl mt-auto mb-20">
              <h1 className="text-6xl text-white mb-8 leading-tight font-bold uppercase tracking-tighter">
                Discover <span className="text-red-600">Greatness.</span>
              </h1>
              <p className="text-lg text-slate-300 font-medium opacity-80">
                Join our community of film critics and enthusiasts. Get personalized AI insights and track your cinematic journey.
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Signup Form */}
        <section className="w-full lg:w-[50%] flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 relative bg-[#0e0e0e] overflow-y-auto">
          <div className="w-full max-w-md py-12">
            <header className="mb-10 text-center">
              <h2 className="text-3xl text-white mb-2 font-bold uppercase tracking-tight">Create Account</h2>
              <p className="text-slate-500 text-sm font-medium">Start your cinematic journey today.</p>
            </header>

            <form className="space-y-6" onSubmit={handleSignup}>
              {error && (
                <div className="bg-red-600/20 border border-red-600/50 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-red-600/50 transition-all outline-none" 
                    placeholder="John" 
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-red-600/50 transition-all outline-none" 
                    placeholder="Doe" 
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-red-600/50 transition-all outline-none" 
                  placeholder="john@example.com" 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-red-600/50 transition-all outline-none" 
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

              <div className="flex items-center gap-3 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-red-600/50 transition-all">
                    <input type="checkbox" className="hidden peer" required />
                    <span className="material-symbols-outlined text-[16px] text-red-600 opacity-0 peer-checked:opacity-100 transition-all">check</span>
                  </div>
                  <span className="text-xs text-slate-400">I agree to the <a href="#" className="text-red-600 font-bold hover:underline">Terms of Service</a></span>
                </label>
              </div>

              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-red-900/20 active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center disabled:opacity-50" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            <footer className="mt-10 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account? 
                <Link href="/login" className="text-red-600 font-bold hover:underline ml-2 uppercase tracking-tight">Sign In</Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

