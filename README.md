# 🎬 CineVerse

**Experience Cinema Through the Lens of AI.**

CineVerse is a premium, full-stack cinematic exploration platform designed for movie enthusiasts who crave deeper insights. Built with a focus on high-end aesthetics and AI-driven analysis, CineVerse transforms the way you discover, track, and critique your favorite films.

---

## ✨ Key Features

### 🤖 AI-Powered Critical Insights
Stop reading through hundreds of contradictory reviews. Our **AI Insight Engine** (powered by Claude) synthesizes community sentiment and movie metadata into a sophisticated cinematic analysis, complete with performance scores and tonal metrics.

### 🎥 Premium Discovery Grid
Explore movies through a high-performance discovery engine featuring:
- **Real-time Search**: Find titles, actors, or directors instantly.
- **Advanced Filtering**: Narrow down by genre, release year, and critical rating.
- **Cinematic Previews**: 3D-hover effects and smooth transitions that make browsing a joy.

### 📦 Personalized Vault (Watchlist)
Mark films for future viewing and access your curated collection anytime. Your vault is secured by industrial-grade authentication.

### 💬 Community Critique
Share your voice with the community. Submit ratings and reviews to influence the AI's consensus and help others discover great cinema.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Hooks & Local Storage
- **Icons**: Google Material Symbols

### Backend
- **Server**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: SQLite (Development) / PostgreSQL Ready
- **AI Integration**: [Anthropic Claude SDK](https://www.anthropic.com/)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- TMDB API Key
- Anthropic API Key (Optional, fallback mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gokubasumatary-web/CineReview.git
   cd CineVerse
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with your variables (see .env.example)
   npx prisma migrate dev
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🎨 Design System

CineVerse uses a custom **Cinematic Dark Mode** design system:
- **Background**: `#131313` (Deep Obsidian)
- **Primary**: `#ffb4aa` (Soft Rose) / `#e50914` (Classic Cinematic Red)
- **Glassmorphism**: 20px blur with 5% white overlays for a premium feel.
- **Typography**: Spline Sans for headings, Inter for body text.

---

## 📈 Roadmap
- [ ] **Phase 1**: Core Discovery & AI Integration (Completed)
- [ ] **Phase 2**: Social Profiles & Follower System
- [ ] **Phase 3**: Recommendation Engine (User-Similarity based)
- [ ] **Phase 4**: Production Deployment (Vercel & Neon)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for the love of Cinema.*
