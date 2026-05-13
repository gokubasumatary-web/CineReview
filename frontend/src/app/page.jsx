'use client';

import { useState, useEffect } from 'react';
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

/**
 * Home Page Component
 * The landing page of the CineVerse platform.
 * Features a cinematic Hero section, weekly trending carousel, and AI-powered recommendations.
 */
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/movies/trending`);
        const data = await response.json();
        
        // Ensure data is an array
        const moviesArray = Array.isArray(data) ? data : [];
        
        // Map TMDB data to our MovieCard format
        const formattedMovies = moviesArray.map(m => ({
          id: m.id.toString(),
          title: m.title,
          genre: m.genre_ids && m.genre_ids.length > 0 ? GENRE_MAP[m.genre_ids[0]] || 'Drama' : 'Drama',
          year: m.release_date ? new Date(m.release_date).getFullYear() : 2025,
          rating: m.vote_average,
          image: `${TMDB_IMAGE_BASE}${m.poster_path}`
        }));

        setTrendingMovies(formattedMovies);
        
        if (moviesArray.length > 0) {
          setHeroMovie(moviesArray[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex flex-col justify-end pb-xl px-margin-mobile md:px-margin-desktop overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src={heroMovie ? `${TMDB_IMAGE_BASE}${heroMovie.backdrop_path}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuBid6dcSQwP31GrSnZ4TbzKNF0plnrH3wfJrY-sM-r0Mz2hE6FiqKpnF1rKMa_4iYeQKFeVIB3s_cXpeIJqULfwZXRQ96tXswWm5XhYOSdNbW1FJhMQYNOaAeuECXjEyA3-su1G91MeBGYmGRA06PRoE9aG_dOVMjuURJpxzOgrUUrGM8z9dmrLF6ui4uiEwDtBahT4ERrIUk53YoSqLmto3pCSizH1kHMJMMeR8bXR0yu9nclBRL67TVOBkjiNeShUjS308zxGAMQ"}
              alt={heroMovie?.title || "Hero Background"}
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl space-y-md">
            <div className="flex items-center gap-4">
              <span className="font-label-caps text-xs bg-red-600 px-3 py-1 rounded-sm text-white uppercase font-bold tracking-widest">Trending #1</span>
              <div className="flex items-center gap-1 text-secondary-fixed">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-rating-num text-rating-num text-white">{heroMovie?.vote_average?.toFixed(1) || "9.2"}</span>
              </div>
            </div>
            <h2 className="font-h1-hero text-6xl uppercase text-white font-bold tracking-tight">
              {heroMovie?.title || "Dune: Part Two"}
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl text-lg opacity-80 line-clamp-3">
              {heroMovie?.overview || "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."}
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button className="bg-primary-container text-white px-8 py-3 rounded-lg font-h2-title text-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-900/30">
                <span className="material-symbols-outlined">play_arrow</span>
                Watch Trailer
              </button>
              <button className="glass-card text-white px-8 py-3 rounded-lg font-h2-title text-lg flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all">
                <span className="material-symbols-outlined">reviews</span>
                Read Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Trending Carousel */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop space-y-12 bg-surface-dim relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
import MovieCard from '@/components/MovieCard';
import SectionHeader from '@/components/SectionHeader';

// ... (skipping constants)

// Inside Home component:
          <div className="flex justify-between items-end relative z-10">
            <SectionHeader 
              title="Trending Now" 
              subtitle="Cinematic Highlights" 
            />
            <a href="/browse" className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl border border-white/5 transition-all mb-12">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Explore All Vault</span>
              <span className="material-symbols-outlined text-sm text-red-600 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          
          <div className="flex gap-10 overflow-x-auto scrollbar-hide pb-12 pt-4 px-2 -mx-2">
            {trendingMovies.map(movie => (
              <div key={movie.id} className="flex-none w-72">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        {/* AI Picks Section */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container/50 border-y border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-tertiary text-4xl">psychology</span>
            <div>
              <h3 className="font-h2-title text-3xl tracking-tight flex items-center gap-3 text-white font-bold uppercase">
                AI Recommended Picks
                <span className="text-[10px] bg-tertiary-container/30 text-tertiary border border-tertiary/30 px-2 py-0.5 rounded-full font-label-caps tracking-widest">PERSONALIZED</span>
              </h3>
              <p className="text-slate-400 font-body-md opacity-70">Sifting through cinema history based on your taste.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main AI Card */}
            <div className="md:col-span-2 relative glass-card ai-glow rounded-2xl p-8 flex flex-col md:flex-row gap-8 group">
              <div className="w-full md:w-1/3 aspect-[2/3] rounded-lg overflow-hidden flex-none shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz--d5eBGCMgEgdWpyxZ7pQp8k56z5COSKV17odls2k_e87c7_fo9tZL7oiuy3kaBo35-WjxmBCd2o0BS46bEIbp7DL_0fQvSj54zxovBTQmqmz2xR1kgfVcc4s1jEidoPTxgLKfv1nRQyPdTv1C8B8zFGGiHynuoRcsGMlbHu9N3N5VsFj3oCc5I7XoPXmXE4Es7Gmd-I_f0IjUumNsKsl7Nbqzk_pcsydLYeKejMebMLS622C9C71iypowHmQzvEipU7x7vkEIU"
                  alt="AI Pick"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-h2-title text-2xl mb-1 text-white font-bold">Chronicles of Void</h4>
                      <div className="flex gap-2">
                        <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full font-label-caps text-slate-400">98% MATCH</span>
                        <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full font-label-caps text-slate-400">CULT CLASSIC</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-secondary-fixed">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-rating-num text-white">9.8</span>
                    </div>
                  </div>
                  <div className="bg-tertiary/10 border-l-2 border-tertiary p-4 rounded-r-lg">
                    <p className="text-tertiary text-sm italic font-medium">
                      "Why you'll like this: Based on your love for Interstellar and Dune, this film explores complex temporal physics with a similar emotional core and grand visual scale."
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed opacity-80">
                    In a world where time is a tradable commodity, a young scholar discovers a hidden dimension where the past can be rewritten, but at the cost of his own existence.
                  </p>
                </div>
                <div className="pt-6 flex gap-6">
                  <button className="bg-tertiary-container text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-indigo-900/20">
                    <span className="material-symbols-outlined text-sm">movie_filter</span> Watch Now
                  </button>
                  <button className="glass-card text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-sm">bookmark</span> Watchlist
                  </button>
                </div>
              </div>
            </div>
            
            {/* Small AI Side Cards */}
            <div className="flex flex-col gap-6">
              <div className="glass-card rounded-2xl p-4 flex gap-4 hover:bg-white/10 transition-all cursor-pointer">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-none">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBppBTEdV3BErlRh1S42qtZWk00DpSgxJRjY1USdLZqjaUXOD4-T12hJFgV0Fcd1icMnvmrRxGxUDmcxCz0nuP2-N0L4O0geDyhim5Sfcy2zmyXEXAGQ4sgY9AgweNZC-AWJGW1yeqssdrHSZzKDX6ktUS0qOL1YWAz9jHjLdcoGYPfqjUtdDzqY-sVVtK2_cK7Mj7lQDD10RYUjCldbRtvKHEV_D34hXjXHJ1JQtSdlb4MhMg12NNxwr6ckscyrAKQVkf_JdQPZXA" alt="Shadow Sovereigns" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-white mb-1">Shadow Sovereigns</h5>
                  <p className="text-xs text-slate-500 mb-2">Period Drama, Action</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-secondary-fixed text-[10px]">
                      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-white font-bold">8.2</span>
                    </div>
                    <span className="text-[10px] text-tertiary font-bold tracking-tight">91% Match</span>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-4 flex gap-4 hover:bg-white/10 transition-all cursor-pointer">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-none">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS7I1H9QxyHjqisRh6BJ08RwpNdsg7ZGjuNVS_BK_6KVRnXd90XzsnkO_gGeG7nvMZwrRzyadZumefuk0RWO6z1J3YhbUiRvd0q92xVnf8eFs3XfVZCGkHS6zMfVlYilCybjeW7uteXNA5MWud-aFXmQPU5ZW5VzonRLo-jimcRw4iTHhXZWZ-wFS39A5AB7cDFO1v6UI2xMMpAX_tWijOrEBlis12gcu4VTNhc-w7G3bZWAk9ESkOI9z4NrHFGKYX8H4mBztiZN8" alt="Mnemonic Recall" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-white mb-1">Mnemonic Recall</h5>
                  <p className="text-xs text-slate-500 mb-2">Sci-Fi, Psychology</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-secondary-fixed text-[10px]">
                      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-white font-bold">7.9</span>
                    </div>
                    <span className="text-[10px] text-tertiary font-bold tracking-tight">85% Match</span>
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
