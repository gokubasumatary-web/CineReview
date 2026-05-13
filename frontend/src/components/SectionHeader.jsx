/**
 * SectionHeader Component
 * A reusable header for main content sections.
 * Features a subtitle accent, main title, and optional description.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.title - The main heading text.
 * @param {string} props.subtitle - The small accent text above the title.
 * @param {string} [props.description] - Optional subtext for context.
 */
export default function SectionHeader({ title, subtitle, description }) {
  return (
    <header className="mb-12 space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-8 h-px bg-red-600"></span>
        <span className="text-[10px] text-red-500 font-bold uppercase tracking-[0.3em]">
          {subtitle}
        </span>
      </div>
      <h2 className="text-5xl text-white font-black uppercase tracking-tighter italic">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-400 opacity-80 max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
}
