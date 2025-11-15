# 🚀 How to Start the Backend Server

## Quick Start (Easiest Method)

### Option 1: Start Both Frontend & Backend Together
From the **root folder** of the project:
```bash
npm run dev
```
This will start both frontend and backend automatically.

---

### Option 2: Start Backend Separately

1. **Open a new terminal/command prompt**

2. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

3. **Make sure you have the `.env` file:**
   - Check if `backend/.env` exists
   - If not, create it with this content:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/git-explorer
     JWT_SECRET=de986251ecda13832080ba4b5020d2da51d8f7cfa6ada5104c16b1c4212499b5
     OPENAI_API_KEY=
     ```

4. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

6. **You should see:**
   ```
   ✅ Connected to MongoDB
   🚀 Server running on http://localhost:5000
   ```

---

## ✅ Success Indicators

When the backend is running correctly, you'll see:
- ✅ `Connected to MongoDB` (or connection error if MongoDB isn't running)
- 🚀 `Server running on http://localhost:5000`

---

## ❌ Common Issues

### Issue 1: "JWT_SECRET is not set"
**Fix:** Create `backend/.env` file (see above)

### Issue 2: "MongoDB connection error"
**Fix:** Start MongoDB:
- Windows: Run `mongod` or start MongoDB service
- Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`
- Or use MongoDB Atlas (cloud)

### Issue 3: "Port 5000 already in use"
**Fix:** 
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update `frontend/.env` with the new port:
  ```env
  VITE_API_URL=http://localhost:5001
  ```

### Issue 4: "Cannot find module"
**Fix:** Install dependencies:
```bash
cd backend
npm install
```

---

## 🔍 Verify Backend is Running

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{"status":"ok","message":"Git History Explorer API is running"}
```

If you see this, the backend is working! ✅

---

## 📝 Next Steps

Once the backend is running:
1. Keep that terminal open (don't close it)
2. The frontend should now be able to connect
3. Try logging in again

