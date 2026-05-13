'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = 'http://localhost:5000/api';

/**
 * Reviews Page Component
 * Aggregates and displays the latest reviews from all users.
 * Acts as a community feed for cinematic discussion.
 */
export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/reviews`);
      const data = await response.json();
      
      // Enhance reviews with movie titles (would normally be joined in DB or fetched separately)
      // For now, we'll just display what we have
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim">
      <Navbar />
      
      <main className="flex-grow pt-32 px-margin-mobile md:px-margin-desktop pb-20">
        <header className="mb-12">
          <h1 className="font-h1-hero text-5xl text-white mb-4 font-bold tracking-tighter uppercase">Community Reviews</h1>
          <p className="text-lg text-slate-400 opacity-80">
            Latest critical insights from the CineVerse community.
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Scanning Reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="glass-card p-20 rounded-[3rem] text-center border border-white/5">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-6 block">rate_review</span>
            <h2 className="text-2xl text-white font-bold mb-4 uppercase">No Reviews Yet</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">Be the first to share your cinematic insight on your favorite films.</p>
            <a href="/browse" className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all inline-block shadow-xl shadow-red-900/20">Explore & Review</a>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl">
            {reviews.map(review => (
              <div key={review.id} className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative group overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600/20 flex items-center justify-center text-red-600 font-black text-xl">
                      {review.user?.name ? review.user.name.charAt(0) : 'U'}
                    </div>
                    <div>
                      <p className="text-white font-bold uppercase tracking-tight">{review.user?.name || 'Anonymous User'}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <span className="material-symbols-outlined text-secondary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-white font-bold">{review.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Movie ID: {review.movieId}</p>
                  <p className="text-xl text-slate-300 leading-relaxed font-light">
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
