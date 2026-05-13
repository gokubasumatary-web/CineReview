'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKEND_URL = 'http://localhost:5000/api';

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

function BrowseContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q');
  
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(urlQuery || '');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState(2025);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('Newest First');

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchMovies = useCallback(async (query = '') => {
    setIsLoading(true);
    try {
      let url = `${BACKEND_URL}/movies/trending`;
      // If query is empty or just "trending movies", show trending list
      const isTrendingSearch = !query || query.toLowerCase().includes('trending');
      
      if (!isTrendingSearch) {
        url = `${BACKEND_URL}/movies/search?q=${encodeURIComponent(query)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      const formatted = data.map(m => ({
        id: m.id.toString(),
        title: m.title,
        genre: m.genre_ids && m.genre_ids.length > 0 ? GENRE_MAP[m.genre_ids[0]] || 'Other' : 'Drama',
        year: m.release_date ? new Date(m.release_date).getFullYear() : 2024,
        rating: m.vote_average || 0,
        image: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'
      }));

      setMovies(formatted);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(urlQuery || '');
  }, [fetchMovies, urlQuery]);

  // Debounced search for the sidebar input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== (urlQuery || '')) {
        fetchMovies(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchMovies, urlQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  const sortedMovies = Array.isArray(movies) ? [...movies].filter(movie => {
    // Robust Genre filter
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(sg => sg.toLowerCase() === (movie.genre || '').toLowerCase());
    
    // Robust Year filter - handle NaN and missing years
    const movieYear = parseInt(movie.year);
    const matchesYear = isNaN(movieYear) || movieYear <= yearRange;
    
    return matchesGenre && matchesYear;
  }).sort((a, b) => {
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    if (sortBy === 'Newest First') return b.year - a.year;
    if (sortBy === 'Popularity') return b.id - a.id;
    return 0;
  }) : [];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim">
      <Navbar />
      
      <main className="flex-grow pt-20 px-margin-mobile md:px-margin-desktop pb-20">
        {/* Search Header */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden h-[400px] flex flex-col justify-end p-8 md:p-12 mb-10 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOj7LXWiB860kLl7EOw43c0wgcJqiqasy6WS1E6W2edsMXgk7yjoK_-UHYCI19YwzeCpjkILpD6SQwqDmF3XZPCUzsIQSYk7CTxS-oqru-asqJHxqsVe6wk_fVNkpB1aVZXv5VvVekNVa1ZbVARcZsPAdhqhmac1LvZJdmbZEYxIdK69D_6FAwDESjWiHp465ckdyaF25tioqRA-W-IIFEho-FoNiRH0gq9dnQZne2dwtaY2BUXsGUo-t2GbetOGUh4MGJcHOSl1g" 
                alt="Browse Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/60 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h1 className="font-h1-hero text-6xl text-white mb-4 font-bold tracking-tighter uppercase">Explore Cinema</h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg opacity-90">
                Discover your next obsession with AI-powered recommendations and deep-dive critical analysis from our global community.
              </p>
              <form onSubmit={handleSearch} className="relative group max-w-xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-tertiary-container rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-surface-container/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pr-4 shadow-xl">
                  <span className="material-symbols-outlined px-4 text-slate-400">search</span>
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-white w-full py-3 text-lg placeholder:text-slate-500 outline-none" 
                    placeholder="Search for titles, actors, genres..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => {setSearchQuery(''); fetchMovies('');}}
                      className="p-2 hover:text-white text-slate-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                  <button type="submit" className="bg-primary-container hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg ml-2">Search</button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 flex-none">
            <div className="sticky top-32 glass-card p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors"></div>
                
                <h3 className="text-2xl text-white mb-10 flex items-center gap-4 font-black uppercase tracking-tighter">
                  <span className="material-symbols-outlined text-red-600 text-3xl">tune</span> Filters
                </h3>

                {/* Search in Sidebar */}
                <div className="mb-12">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Search Vault</p>
                  <div className="relative group/search">
                    <input 
                      suppressHydrationWarning
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all outline-none placeholder:text-slate-600" 
                      placeholder="Title or actor..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery ? (
                      <button 
                        onClick={() => {setSearchQuery(''); fetchMovies('');}}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    ) : (
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-red-600 transition-colors">search</span>
                    )}
                  </div>
                </div>
                
                {/* Genres */}
                <div className="mb-12">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6">Genre Galaxy</p>
                  <div className="flex flex-wrap gap-3">
                    {['Action', 'Sci-Fi', 'Drama', 'Horror', 'Thriller', 'Comedy', 'Noir', 'Mystery'].map((genre) => (
                      <button 
                        key={genre}
                        suppressHydrationWarning
                        onClick={() => toggleGenre(genre)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          selectedGenres.includes(genre) 
                          ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40 translate-y-[-2px]' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Release Year */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Era Selection</p>
                    <span className="text-xs font-black text-white bg-red-600/20 px-3 py-1 rounded-lg border border-red-600/20">{yearRange}</span>
                  </div>
                  <input 
                    suppressHydrationWarning
                    type="range" 
                    min="1960" 
                    max="2025" 
                    value={yearRange}
                    onChange={(e) => setYearRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>1960</span>
                    <span>2025</span>
                  </div>
                </div>


                <button 
                  onClick={() => {
                    setSelectedGenres([]);
                    setYearRange(2025);
                    setSearchQuery('');
                    fetchMovies('');
                  }}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold rounded-xl transition-all border border-white/5 active:scale-95"
                >
                  Reset All Filters
                </button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-10 px-4">
                <p className="text-sm text-slate-500 font-medium">
                  Showing <span className="text-white font-bold">{movies.length}</span> results for <span className="text-red-500 font-bold uppercase tracking-tight">{searchQuery || 'Trending Movies'}</span>
                </p>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-red-600/50 transition-all">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sort By</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none text-white text-sm font-bold focus:ring-0 cursor-pointer outline-none"
                  >
                    <option className="bg-surface-dim">Newest First</option>
                    <option className="bg-surface-dim">Highest Rated</option>
                    <option className="bg-surface-dim">Popularity</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-[2/3] rounded-[2rem] bg-white/5 animate-pulse border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
                        <div className="h-6 w-3/4 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem] border border-dashed border-white/10">
                  <span className="material-symbols-outlined text-8xl text-slate-800 mb-6">movie_off</span>
                  <h4 className="text-xl text-white font-bold mb-2 uppercase tracking-tight">No Cinematic Matches</h4>
                  <p className="text-slate-500 text-sm mb-8">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => {
                      setSelectedGenres([]);
                      setYearRange(2025);
                      setSearchQuery('');
                      fetchMovies('');
                    }}
                    className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-900/40"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-16 flex items-center justify-center gap-3">
                <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5 hover:bg-white/10">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-12 h-12 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center shadow-lg shadow-red-600/30 active:scale-95">1</button>
                <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-300 font-bold hover:bg-white/5 transition-all border border-white/5">2</button>
                <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-300 font-bold hover:bg-white/5 transition-all border border-white/5">3</button>
                <span className="text-slate-600 px-4 font-bold tracking-widest">...</span>
                <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-300 font-bold hover:bg-white/5 transition-all border border-white/5">42</button>
                <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5 hover:bg-white/10">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Insight Footer Panel */}
        <section className="mt-24">
          <div className="relative p-[1px] bg-gradient-to-br from-red-600 via-tertiary-container to-red-900 rounded-[3rem] overflow-hidden group shadow-2xl">
            <div className="bg-surface-dim/95 backdrop-blur-3xl rounded-[2.9rem] p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
                <div className="lg:w-1/3 relative flex justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-red-600/30 to-tertiary-container/30 absolute blur-3xl animate-pulse"></div>
                  <span className="material-symbols-outlined text-[180px] text-tertiary-container opacity-50 drop-shadow-2xl">psychology</span>
                </div>
                <div className="lg:w-2/3 space-y-8">
                  <h3 className="text-4xl text-white font-bold tracking-tight">Why you'll like <span className="text-tertiary italic">Neon Rain</span></h3>
                  <p className="text-xl text-slate-400 leading-relaxed font-light">
                    Our AI synthesized <span className="text-white font-medium">1,200 reviews</span> and your viewing history to determine this is a <span className="text-secondary-fixed font-bold">98% match</span>. You enjoy complex non-linear narratives and moody cinematographic palettes, which are the hallmarks of this director's latest masterpiece.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {['Complex Narrative', 'Atmospheric Visuals', 'Similar to Blade Runner'].map(tag => (
                      <div key={tag} className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border border-white/10 shadow-lg">
                        <span className="material-symbols-outlined text-tertiary text-sm">auto_awesome</span>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-dim flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
