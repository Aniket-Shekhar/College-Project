# 🔧 Troubleshooting Guide

## Login Failed - Common Issues & Solutions

### 1. ❌ "Cannot connect to server" or "Network Error"

**Problem:** Backend server is not running or not accessible.

**Solution:**
```bash
# Make sure you're in the project root
cd "D:\Git history explorer 2"

# Start the backend server
cd backend
npm run dev

# You should see:
# ✅ Connected to MongoDB
# 🚀 Server running on http://localhost:5000
```

**Check:**
- Is the backend server running? Look for the message "🚀 Server running on http://localhost:5000"
- Is port 5000 available? Check if another app is using it
- Check browser console (F12) for network errors

---

### 2. ❌ "Invalid credentials"

**Problem:** You're trying to login with an account that doesn't exist.

**Solution:**
- **Sign up first!** Click "Sign up" or "Don't have an account? Sign up"
- Create a new account with:
  - Email: `your-email@example.com`
  - Password: `at least 6 characters`
  - Name: `Your Name` (optional)

**Note:** There are no default accounts. You must create your own account first.

---

### 3. ❌ MongoDB Connection Error

**Problem:** MongoDB is not running or connection string is wrong.

**Check backend console for:**
```
❌ MongoDB connection error: ...
```

**Solution:**

**Option A: Local MongoDB**
```bash
# Windows - Start MongoDB service
# Or run: mongod

# Linux/Mac
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Get your connection string from MongoDB Atlas
2. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/git-explorer
   ```

---

### 4. ❌ "secretOrPrivateKey must have a value"

**Problem:** JWT_SECRET is missing in backend/.env

**Solution:**
1. Create `backend/.env` file (if it doesn't exist)
2. Add this content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/git-explorer
   JWT_SECRET=de986251ecda13832080ba4b5020d2da51d8f7cfa6ada5104c16b1c4212499b5
   OPENAI_API_KEY=
   ```
3. Restart the backend server

---

### 5. ❌ CORS Error

**Problem:** Frontend can't communicate with backend due to CORS.

**Solution:**
- Make sure `frontend/.env` has:
  ```env
  VITE_API_URL=http://localhost:5000
  ```
- Restart the frontend dev server after changing .env

---

### 6. ❌ "User already exists" (Signup)

**Problem:** You're trying to sign up with an email that's already registered.

**Solution:**
- Use a different email address, OR
- Login with the existing account instead

---

## 🔍 Debugging Steps

### Step 1: Check Backend Status
```bash
# In backend folder
npm run dev
```

**Expected output:**
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 2: Check Frontend Status
```bash
# In frontend folder (or root with npm run dev)
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Go to Network tab
5. Try logging in again
6. Check if `/api/auth/login` request:
   - Shows status 200 (success) or error code
   - Has the correct response

### Step 4: Test API Directly
```bash
# Test if backend is responding
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","message":"Git History Explorer API is running"}
```

---

## ✅ Quick Checklist

Before reporting an issue, check:

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] Frontend server is running (`npm run dev` in frontend folder or root)
- [ ] MongoDB is running (local or Atlas)
- [ ] `backend/.env` file exists with JWT_SECRET
- [ ] `frontend/.env` file exists with VITE_API_URL
- [ ] No port conflicts (5000 for backend, 5173 for frontend)
- [ ] Browser console shows no CORS errors
- [ ] You're trying to sign up first (not login to non-existent account)

---

## 🆘 Still Having Issues?

1. **Check the exact error message** in:
   - Browser console (F12)
   - Backend terminal output
   - Frontend terminal output

2. **Verify all files exist:**
   - `backend/.env`
   - `frontend/.env`
   - `backend/server.js`
   - All route files

3. **Restart everything:**
   ```bash
   # Stop all servers (Ctrl+C)
   # Then restart:
   npm run dev  # from root, or separately
   ```

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear localStorage in DevTools

---

## 📞 Common Error Messages

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Cannot connect to server" | Backend not running | Start backend server |
| "Invalid credentials" | Wrong email/password or user doesn't exist | Sign up first or check credentials |
| "User already exists" | Email already registered | Use different email or login instead |
| "secretOrPrivateKey must have a value" | Missing JWT_SECRET | Create backend/.env file |
| "MongoDB connection error" | MongoDB not running | Start MongoDB or check connection string |
| CORS error | Frontend can't reach backend | Check VITE_API_URL in frontend/.env |

