'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-12">
        <Link href="/">
          <h1 className="text-2xl font-black italic tracking-tighter text-red-600 dark:text-red-600 font-h1-hero cursor-pointer">
            CineReview
          </h1>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="font-h1-hero tracking-tight text-slate-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/browse" className="font-h1-hero tracking-tight text-slate-400 hover:text-white transition-colors">
            Browse
          </Link>
          <Link href="/watchlist" className="font-h1-hero tracking-tight text-slate-400 hover:text-white transition-colors">
            Watchlist
          </Link>
          <Link href="/reviews" className="font-h1-hero tracking-tight text-slate-400 hover:text-white transition-colors">
            Reviews
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-red-600 transition-all">
          <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
          <input 
            suppressHydrationWarning
            className="bg-transparent border-none focus:ring-0 text-sm w-48 font-body-md text-white outline-none" 
            placeholder="Search films..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            suppressHydrationWarning
          />
        </div>
        <button suppressHydrationWarning className="text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        
        {mounted && (user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm uppercase">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <span className="text-sm text-white font-medium hidden md:block">{user.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
            Login
          </Link>
        ))}
      </div>
    </header>
  );
}
