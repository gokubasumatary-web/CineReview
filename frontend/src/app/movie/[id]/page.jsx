'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const BACKEND_URL = 'http://localhost:5000/api';

/**
 * Movie Detail Page Component
 * Displays comprehensive information about a specific movie.
 * Features:
 * - Dynamic backdrop and metadata retrieval.
 * - AI-powered Critical Insights panel.
 * - Principal cast carousel.
 * - Community review submission and display.
 * - Watchlist integration.
 */
export default function MovieDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const handleAddToWatchlist = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    setIsAdding(true);

    try {
      const response = await fetch(`${BACKEND_URL}/watchlist/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, movieId: id })
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Please login to leave a review');
      return;
    }

    const user = JSON.parse(storedUser);
    
    try {
      const response = await fetch(`${BACKEND_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          movieId: id,
          content: reviewContent,
          rating: parseInt(reviewRating)
        })
      });

      if (response.ok) {
        alert('Review submitted! Your cinematic insight has been shared.');
        setIsReviewModalOpen(false);
        setReviewContent('');
        
        // Refresh movie data to show the new review
        const refreshResponse = await fetch(`${BACKEND_URL}/movies/${id}`);
        const refreshData = await refreshResponse.json();
        setMovie(refreshData);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Review Error:', error);
      alert('Network error. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/movies/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-dim flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-surface-dim flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-slate-400">The cinematic universe couldn't locate this title.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim text-on-surface">
      <Navbar />
      
      <main className="flex-grow">
        {/* Backdrop Hero */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src={movie.backdrop_path ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}` : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80'}
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-margin-mobile md:px-margin-desktop">
            <div className="flex items-center gap-4 mb-6">
              {movie.genres?.map(g => (
                <span key={g.id} className="text-[10px] font-bold text-red-500 border border-red-600/30 px-3 py-1 rounded-full uppercase tracking-widest bg-red-600/5">{g.name}</span>
              ))}
            </div>
            <h1 className="font-h1-hero text-6xl md:text-8xl text-white mb-4 font-bold uppercase tracking-tighter drop-shadow-2xl">{movie.title}</h1>
            <div className="flex items-center gap-8 text-slate-300 font-bold uppercase tracking-widest text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                <span>{movie.runtime || '0'} min</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary-fixed/10 px-3 py-1.5 rounded-lg border border-secondary-fixed/20 text-secondary-fixed">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-rating-num text-lg">{movie.vote_average?.toFixed(1) || '0.0'}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop py-20">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-12">
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">The Synopsis</h3>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  {movie.overview || "No overview available for this film."}
                </p>
              </div>

              {/* Cast Carousel */}
              <div className="space-y-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Principal Cast</h3>
                <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
                  {movie.credits?.cast?.slice(0, 8).map(actor => (
                    <div key={actor.id} className="flex-none w-40 space-y-4 group">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x250?text=No+Photo'}
                          alt={actor.name}
                        />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm uppercase tracking-tight truncate">{actor.name}</p>
                        <p className="text-slate-500 text-[10px] font-medium uppercase truncate">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                  {(!movie.credits?.cast || movie.credits.cast.length === 0) && (
                    <p className="text-slate-500 italic uppercase tracking-widest text-xs">Cast information unavailable.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar - AI Insight Panel */}
            <aside className="lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                <div className="glass-card p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors"></div>
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                      <span className="material-symbols-outlined text-red-600 animate-pulse">auto_awesome</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-xs">AI Critical Insight</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">CineVerse Intelligence v2.0</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Score</p>
                        <span className="text-2xl font-bold text-white uppercase tracking-tighter italic">{movie.aiInsight?.score || 85}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-600 to-indigo-600 transition-all duration-1000" style={{ width: `${movie.aiInsight?.score || 85}%` }}></div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed italic opacity-80 border-l-2 border-red-600/30 pl-4 py-2">
                      "{movie.aiInsight?.analysis || "Synthesizing critical consensus and thematic depth..."}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Visual Style</p>
                        <p className="text-white font-bold text-xs uppercase">{movie.aiInsight?.visualStyle || "Polished"}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Pacing</p>
                        <p className="text-white font-bold text-xs uppercase">{movie.aiInsight?.pacing || "Calculated"}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Pros & Cons</p>
                      <div className="space-y-2">
                        {movie.aiInsight?.pros?.map((pro, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            {pro}
                          </div>
                        ))}
                        {movie.aiInsight?.cons?.map((con, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-amber-400 font-medium bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/10">
                            <span className="material-symbols-outlined text-sm">info</span>
                            {con}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToWatchlist}
                    disabled={isAdding}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl border border-white/5 transform active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
                  >
                    {isAdding ? 'Adding...' : 'Add to Watchlist'}
                  </button>
                  <button 
                    onClick={() => {
                      if (!localStorage.getItem('user')) {
                        router.push('/login');
                      } else {
                        setIsReviewModalOpen(true);
                      }
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-red-900/40 transform active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
                  >
                    Write Review
                  </button>
                </div>

                {/* Review Modal */}
                {isReviewModalOpen && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsReviewModalOpen(false)}></div>
                    <div className="relative bg-surface-container rounded-[2.5rem] p-10 max-w-lg w-full border border-white/10 shadow-2xl">
                      <h2 className="text-2xl text-white font-bold mb-6 uppercase tracking-tight">Write Your Review</h2>
                      <form onSubmit={handleSubmitReview} className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</label>
                          <select 
                            value={reviewRating} 
                            onChange={(e) => setReviewRating(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none"
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="bg-surface-dim">{n} Stars</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Your Thoughts</label>
                          <textarea 
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-40 outline-none"
                            placeholder="Share your cinematic insight..."
                            required
                          />
                        </div>
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all">Submit Review</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
        <section className="px-margin-mobile md:px-margin-desktop py-20 border-t border-white/5 bg-black/20">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h3 className="text-3xl text-white font-bold tracking-tight uppercase">Community Reviews</h3>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Voice of the CineVerse</p>
              </div>
              <button 
                onClick={() => {
                  if (!localStorage.getItem('user')) {
                    router.push('/login');
                  } else {
                    setIsReviewModalOpen(true);
                  }
                }}
                className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
              >
                Post Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
              {movie.communityReviews && movie.communityReviews.length > 0 ? (
                movie.communityReviews.map((review, index) => (
                  <div key={index} className="glass-card p-8 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-bold border border-red-600/20">
                          {review.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{review.user?.name || 'Anonymous User'}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-secondary-fixed/10 px-3 py-1 rounded-lg border border-secondary-fixed/20 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold text-xs">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic font-light">"{review.content}"</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                  <span className="material-symbols-outlined text-6xl text-slate-700 mb-4 block">rate_review</span>
                  <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">No reviews yet. Be the first to share your insight!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
