# 🚀 Quick Start Guide

## One-Command Setup

```bash
# Install all dependencies
npm run install:all
```

## Environment Setup

### 1. Backend Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/git-explorer
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=your-openai-api-key-optional
```

**Quick JWT Secret Generator:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Frontend Environment

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

## Start MongoDB

**Windows:**
```bash
# If installed as service, it should auto-start
# Or start manually:
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**MongoDB Atlas (Cloud):**
- No local setup needed
- Use your connection string in `MONGODB_URI`

## Run the Application

```bash
# Start both frontend and backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## First Steps

1. Open http://localhost:5173
2. Click "Sign up" to create an account
3. Enter email and password (min 6 characters)
4. You'll be redirected to Dashboard

## Using Git Features

The app automatically detects if you're in a Git repository. To analyze a specific repo:

1. Navigate to the repository directory in terminal
2. Start the app from that directory, OR
3. Modify API calls to include `repoPath` query parameter

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `backend/.env`
- For Atlas, whitelist your IP address

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env`

### Git Commands Not Working
- Ensure you're in a Git repository
- Check repository path is correct
- Verify `simple-git` has proper permissions

### AI Summaries Not Working
- Set `OPENAI_API_KEY` in `backend/.env`
- Feature works without it (graceful degradation)

## Project Structure

```
git-history-explorer/
├── backend/          # Express API server
├── frontend/         # React application
└── package.json      # Root package file
```

## Features Available

✅ JWT Authentication  
✅ Commit History Dashboard  
✅ Analytics with Charts  
✅ Branch Insights  
✅ Diff Viewer  
✅ AI Commit Summaries  
✅ Contributor Leaderboard  
✅ User Profile  
✅ Command Helper  
✅ Dark/Light Theme  

Enjoy exploring your Git history! 🎉

