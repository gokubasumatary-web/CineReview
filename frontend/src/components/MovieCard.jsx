import Link from 'next/link';
import { useState } from 'react';

const BACKEND_URL = 'http://localhost:5000/api';

export default function MovieCard({ movie }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Please login to add to watchlist');
      return;
    }

    const user = JSON.parse(storedUser);
    setIsAdding(true);

    try {
      const response = await fetch(`${BACKEND_URL}/watchlist/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, movieId: movie.id })
      });
      
      if (response.ok) {
        alert('Added to watchlist!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add');
      }
    } catch (error) {
      console.error('Watchlist Error:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group relative flex-none w-full max-w-[280px] perspective-1000">
      <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden transition-all duration-700 transform-gpu group-hover:rotate-y-12 group-hover:scale-[1.02] shadow-2xl group-hover:shadow-red-600/20 group-hover:-translate-y-4">
        {/* Poster Image */}
        <img 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
          src={movie.image}
          alt={movie.title}
        />
        
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
        
        {/* Floating Actions */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <button 
              onClick={handleAddToWatchlist}
              disabled={isAdding}
              className="w-full py-4 bg-white/10 hover:bg-red-600 backdrop-blur-xl text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] border border-white/20 transition-all shadow-2xl active:scale-95"
            >
              {isAdding ? 'Syncing...' : 'Add to Vault'}
            </button>
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute top-5 right-5 glass-card-dark px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <span className="material-symbols-outlined text-secondary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-sm text-white font-black">{movie.rating?.toFixed(1) || '0.0'}</span>
        </div>

        {/* Quality Badge (Optional/Simulated) */}
        <div className="absolute top-5 left-5 bg-red-600 px-2.5 py-1 rounded-lg">
          <span className="text-[9px] text-white font-black uppercase tracking-widest">4K Ultra</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 px-2 transform transition-transform duration-500 group-hover:translate-y-2">
        <h4 className="font-bold text-white text-xl leading-tight group-hover:text-red-500 transition-colors duration-300 uppercase tracking-tighter line-clamp-1">
          {movie.title}
        </h4>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-600/10 px-2 py-0.5 rounded-md">
            {movie.genre}
          </span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {movie.year || '2024'}
          </span>
        </div>
      </div>
    </Link>
  );
}
