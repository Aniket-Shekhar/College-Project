# 🚀 Quick Setup Guide

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for testing the Git features)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for:
- Root project (concurrently for running both servers)
- Frontend (React, Vite, TailwindCSS, etc.)
- Backend (Express, MongoDB, simple-git, etc.)

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file (copy from `.env.example`):
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

3. Edit `.env` and set your values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/git-explorer
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENAI_API_KEY=your-openai-api-key-optional
```

**Important:**
- For local MongoDB: Use `mongodb://localhost:27017/git-explorer`
- For MongoDB Atlas: Use your connection string
- Generate a strong JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- OpenAI API key is optional (only needed for AI summaries)

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create a `.env` file:
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

3. The default `.env` should work if backend is on port 5000:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
# Windows (if installed as service, it should auto-start)
# Or start manually:
mongod

# Linux/Mac
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**MongoDB Atlas:**
- No local setup needed, just use your connection string in `.env`

### 5. Start the Application

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000`

### 6. First Time Setup

1. Open `http://localhost:5173` in your browser
2. Click "Sign up" to create an account
3. Enter your email and password (minimum 6 characters)
4. You'll be redirected to the Dashboard

### 7. Using Git Features

To use the Git visualization features:

1. **Option A: Use the current directory** (if it's a Git repo)
   - The app will automatically detect if you're in a Git repository
   - Navigate to Dashboard to see commits

2. **Option B: Specify a repository path**
   - You can modify the API calls to include a `repoPath` query parameter
   - Example: `/api/git/commits?repoPath=/path/to/your/repo`

## Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is running
- Check your `MONGODB_URI` in `backend/.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use

- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` to match

### Git Commands Not Working

- Make sure you're in a Git repository
- Check that `simple-git` has proper permissions
- Verify the repository path is correct

### AI Summaries Not Working

- Ensure `OPENAI_API_KEY` is set in `backend/.env`
- Check your OpenAI account has credits
- The feature will gracefully degrade if API key is missing

## Production Deployment

### Backend (Render/Railway)

1. Set environment variables in your hosting platform
2. Make sure MongoDB is accessible (use Atlas for production)
3. Update CORS settings if needed

### Frontend (Vercel/Netlify)

1. Set `VITE_API_URL` to your production backend URL
2. Build: `npm run build`
3. Deploy the `dist` folder

## Next Steps

- Customize the theme colors in `frontend/tailwind.config.js`
- Add more Git commands in `frontend/src/pages/CommandHelper.jsx`
- Enhance analytics with more charts
- Add repository selection UI

