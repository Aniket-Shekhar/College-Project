# 🔐 Environment Setup - Quick Fix

## Error: "secretOrPrivateKey must have a value"

This error means the `JWT_SECRET` environment variable is missing.

## ✅ Quick Fix

Create a file named `.env` in the `backend/` folder with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/git-explorer
JWT_SECRET=de986251ecda13832080ba4b5020d2da51d8f7cfa6ada5104c16b1c4212499b5
OPENAI_API_KEY=
```

## 📝 Steps:

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create the `.env` file:**
   - Windows: Create a new file named `.env` (make sure it's not `.env.txt`)
   - Mac/Linux: `touch .env`

3. **Copy the content above** into the `.env` file

4. **Save the file**

5. **Restart your backend server:**
   ```bash
   npm run dev
   ```

## 🔑 Generate Your Own JWT Secret (Optional)

If you want to generate a new secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then replace the `JWT_SECRET` value in your `.env` file with the generated value.

## ✅ After Setup

Once the `.env` file is created, restart your backend server and try logging in again!

