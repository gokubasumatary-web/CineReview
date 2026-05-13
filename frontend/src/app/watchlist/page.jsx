'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import SectionHeader from '@/components/SectionHeader';

const BACKEND_URL = 'http://localhost:5000/api';

/**
 * Watchlist Page Component
 * Displays the user's personal collection of movies.
 * Features:
 * - Secure access (Login required).
 * - Multi-stage data fetching (Backend Watchlist IDs -> TMDB Details).
 * - Empty state and loading state handling.
 */
export default function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchWatchlist(parsedUser.id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchWatchlist = async (userId) => {
    try {
      // 1. Get watchlist IDs from our backend
      const response = await fetch(`${BACKEND_URL}/watchlist?userId=${userId}`);
      const watchlistData = await response.json();
      
      // 2. Fetch full movie details for each item from TMDB via our backend
      const moviePromises = watchlistData.map(item => 
        fetch(`${BACKEND_URL}/movies/${item.movieId}`).then(res => res.json())
      );
      
      const fullMovies = await Promise.all(moviePromises);
      
      const formatted = fullMovies.map(m => ({
        id: m.id.toString(),
        title: m.title,
        genre: m.genres && m.genres.length > 0 ? m.genres[0].name : 'Drama',
        rating: m.vote_average || 0,
        image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'
      }));

      setMovies(formatted);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim">
      <Navbar />
      
      <main className="flex-grow pt-32 px-margin-mobile md:px-margin-desktop pb-20">
        <SectionHeader 
          title="My Watchlist" 
          subtitle="Vault" 
          description="Films you've marked for future cinematic experiences."
        />

        {!user ? (
          <div className="glass-card p-20 rounded-[3rem] text-center border border-white/5">
            <span className="material-symbols-outlined text-6xl text-red-600 mb-6 block">lock</span>
            <h2 className="text-2xl text-white font-bold mb-4 uppercase">Login Required</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">Please sign in to view and manage your personal watchlist.</p>
            <a href="/login" className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all inline-block shadow-xl shadow-red-900/20">Sign In Now</a>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing your Vault...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="glass-card p-20 rounded-[3rem] text-center border border-white/5">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-6 block">movie_filter</span>
            <h2 className="text-2xl text-white font-bold mb-4 uppercase">Your Vault is Empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">Start adding films to your watchlist to see them here.</p>
            <a href="/browse" className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all inline-block shadow-xl shadow-red-900/20">Explore Movies</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
