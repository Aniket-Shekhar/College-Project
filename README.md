# 🚀 Git History Explorer

A full-stack web application that lets users explore, analyze, and visualize a Git repository's commit history with AI-powered commit summaries, contributor analytics, and interactive visualizations.

## ✨ Features

### Core Features
- 🔐 JWT-based authentication (Login/Signup)
- 📊 Interactive dashboard with commit history
- 📈 Analytics page with charts and AI summaries
- 🎨 Futuristic UI with light/dark theme toggle
- 🛠️ Command Helper with animated terminal UI
- 📱 Fully responsive design

### AI Features
- 🤖 **AI Commit Summarizer**: Summarizes commit messages using OpenAI GPT
- 🌿 **Branch Insights**: Visualize how branches evolved with commit counts
- 💊 **Repo Health**: AI grades repository activity (0-100%)

### Visual Components
- 📊 **Commit Timeline/Tree**: Interactive charts using Recharts
- 🏆 **Contributor Leaderboard**: Animated ranks with progress bars
- 🔍 **Diff Viewer**: Side-by-side comparison of commits
- 📈 **Multiple Chart Types**: Bar, Line, Pie charts for analytics

### Animations
- ✨ Smooth hover effects on buttons/cards
- 📉 Slide-in charts with Framer Motion
- 🎭 Fade transitions between pages
- 💫 Glowing neon hover borders

## 🛠️ Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Framer Motion
- Recharts

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- simple-git

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git repository to analyze

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Set up environment variables:

**Backend** (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/git-explorer
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=your-openai-api-key-optional
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

3. Start the development servers:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:5000`

## 📁 Project Structure

```
git-history-explorer/
├── frontend/          # React + Vite frontend
├── backend/           # Express backend
└── README.md
```

## 🎯 Pages

1. **Login/Signup** - Authentication with animated cards
2. **Dashboard** - Main commit history view with search, filters, and diff comparison
3. **Analytics** - Charts, leaderboard, AI summaries, and branch insights
4. **About** - Project information
5. **Command Helper** - Visual Git command guide with animated terminal UI
6. **Profile** - User profile with repository statistics

## 📁 Project Structure

```
git-history-explorer/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── models/
│   │   └── User.js            # User model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── commits.js         # Commit endpoints
│   │   ├── git.js             # Git operations
│   │   ├── analytics.js       # Analytics & AI
│   │   └── users.js           # User profile
│   ├── utils/
│   │   └── gitHelper.js       # Git utility functions
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CommitTable.jsx
│   │   │   ├── DiffViewer.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── BranchInsights.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── About.jsx
│   │   │   ├── CommandHelper.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   └── App.jsx
│   └── package.json
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user

### Commits
- `GET /api/commits` - Get all commits
- `GET /api/commits/:commitId` - Get specific commit

### Git Operations
- `GET /api/git/commits` - Get commit history
- `GET /api/git/diff/:commitA/:commitB` - Get diff between commits
- `GET /api/git/branches` - Get branch information
- `GET /api/git/info` - Get repository info

### Analytics
- `GET /api/analytics/stats` - Get repository statistics
- `GET /api/analytics/contributors` - Get contributor data
- `POST /api/analytics/summarize` - Generate AI summary

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 📝 License

MIT

