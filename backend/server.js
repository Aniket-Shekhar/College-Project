import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import gitRoutes from './routes/git.js';
import analyticsRoutes from './routes/analytics.js';
import commitsRoutes from './routes/commits.js';
import usersRoutes from './routes/users.js';

dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not set in environment variables!');
  console.error('📝 Please create a backend/.env file with:');
  console.error('   JWT_SECRET=your-secret-key-here');
  console.error('   (Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))")');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/git', gitRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/commits', commitsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Git History Explorer API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

