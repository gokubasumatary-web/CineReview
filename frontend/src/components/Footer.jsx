import Link from 'next/link';

/**
 * Footer Component
 * Displays application branding, useful links, and a newsletter subscription form.
 */
export default function Footer() {
  return (
    <footer className="py-xl px-margin-mobile md:px-margin-desktop border-t border-white/10 bg-surface-container-lowest">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
        <div className="space-y-md">
          <h2 className="text-xl font-black italic tracking-tighter text-red-600 uppercase">CineVerse</h2>
          <p className="text-slate-500 text-sm">
            Elevating the way you discover and critique the world of cinema. AI-powered insights, community-driven reviews.
          </p>
          <div className="flex gap-4">
            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-md">Movies</h4>
          <ul className="space-y-sm text-sm text-slate-500">
            <li><Link href="/browse" className="hover:text-red-500 transition-colors">Trending Now</Link></li>
            <li><Link href="/browse" className="hover:text-red-500 transition-colors">Coming Soon</Link></li>
            <li><Link href="/browse" className="hover:text-red-500 transition-colors">Popular Genres</Link></li>
            <li><Link href="/browse" className="hover:text-red-500 transition-colors">Award Winners</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-md">Community</h4>
          <ul className="space-y-sm text-sm text-slate-500">
            <li><Link href="/community" className="hover:text-red-500 transition-colors">Top Reviewers</Link></li>
            <li><Link href="/community" className="hover:text-red-500 transition-colors">Discussion Forums</Link></li>
            <li><Link href="/community" className="hover:text-red-500 transition-colors">Review Guidelines</Link></li>
            <li><Link href="/community" className="hover:text-red-500 transition-colors">Leaderboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-md">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-md">Get weekly AI picks and film news.</p>
          <div className="flex">
            <input 
              className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm focus:ring-0 focus:border-red-600 w-full outline-none text-white" 
              placeholder="Email address" 
              type="email"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-lg border-t border-white/5 text-xs text-slate-600 gap-md">
        <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
        <div className="flex gap-lg">
          <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-slate-400">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
