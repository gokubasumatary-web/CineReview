# CineVerse 🎬

CineVerse is a premium, AI-powered movie review platform designed for cinephiles. It combines a cinematic UI with advanced AI insights to provide a unique movie discovery and analysis experience.

## ✨ Features

- **Cinematic UI/UX**: A dark-mode, glassmorphic design inspired by premium streaming platforms.
- **AI-Powered Insights**: Get genre-aware analysis and performance metrics for any movie using AI.
- **Real-time Movie Data**: Integrated with the TMDB API for up-to-date movie information, trailers, and posters.
- **Advanced Authentication**:
  - Secure Login & Signup.
  - **Forgot Password**: Full password recovery flow with email-based reset links.
  - **Password Visibility**: Toggle show/hide password for better user experience.
- **Personalized Watchlist**: Save movies to your profile for later viewing.
- **Community Reviews**: Write and share your own reviews with the community.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols Outlined
- **Animations**: Framer Motion / CSS Transitions

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (managed via Prisma ORM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Email Service**: Nodemailer (for password recovery)
- **AI Integration**: Claude API (for cinematic analysis)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gokubasumatary-web/CineReview.git
   cd CineReview
   ```

2. **Backend Configuration**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add your credentials:
     ```env
     PORT=5000
     DATABASE_URL="file:./dev.db"
     JWT_SECRET=your_secret_key
     TMDB_API_KEY=your_tmdb_api_key
     CLAUDE_API_KEY=your_claude_api_key
     EMAIL_USER=your_gmail@gmail.com
     EMAIL_PASS=your_google_app_password
     ```
   - Initialize the database:
     ```bash
     npx prisma db push
     npx prisma generate
     ```

3. **Frontend Configuration**:
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     npm install
     ```

### Running the Project

- **Start Backend**: In the `backend` folder, run `npm run dev`.
- **Start Frontend**: In the `frontend` folder, run `npm run dev`.

The application will be available at `http://localhost:3000`.

## 🔒 Security Note
For the **Forgot Password** feature to send real emails, you must use a Google "App Password" in the `EMAIL_PASS` field. For development, reset links are also printed to the backend console logs.

## 📄 License
This project is for portfolio and educational purposes.
