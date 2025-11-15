import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCommitHistory, getContributors, isGitRepository } from '../utils/gitHelper.js';
import OpenAI from 'openai';

const router = express.Router();
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Get analytics data
router.get('/stats', authenticate, async (req, res) => {
  try {
    const { repoPath } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    // Get all commits
    const commits = await getCommitHistory(repoPath, 1000);

    // Calculate stats
    const authorStats = {};
    const dateStats = {};
    
    commits.forEach(commit => {
      // Author stats
      const author = commit.author;
      authorStats[author] = (authorStats[author] || 0) + 1;

      // Date stats (by day)
      const date = new Date(commit.date).toISOString().split('T')[0];
      dateStats[date] = (dateStats[date] || 0) + 1;
    });

    // Get branches
    const { getBranchInfo } = await import('../utils/gitHelper.js');
    const branchInfo = await getBranchInfo(repoPath);

    // Calculate project health (simple metric)
    const totalCommits = commits.length;
    const uniqueAuthors = Object.keys(authorStats).length;
    const daysActive = Object.keys(dateStats).length;
    const healthScore = Math.min(100, Math.round(
      (totalCommits * 0.3) + (uniqueAuthors * 20) + (daysActive * 2)
    ));

    res.json({
      totalCommits,
      uniqueAuthors,
      daysActive,
      healthScore,
      authorStats: Object.entries(authorStats)
        .map(([author, count]) => ({ author, count }))
        .sort((a, b) => b.count - a.count),
      dateStats: Object.entries(dateStats)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      branches: branchInfo.branches.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contributors
router.get('/contributors', authenticate, async (req, res) => {
  try {
    const { repoPath } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const contributors = await getContributors(repoPath);
    res.json({ contributors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get AI commit summary
router.post('/summarize', authenticate, async (req, res) => {
  try {
    const { commits } = req.body;

    if (!openai) {
      return res.json({ 
        summary: 'AI summarization not available. Please configure OPENAI_API_KEY.',
        aiEnabled: false
      });
    }

    if (!commits || commits.length === 0) {
      return res.status(400).json({ message: 'No commits provided' });
    }

    // Prepare commit messages for AI
    const commitMessages = commits
      .slice(0, 20) // Limit to recent 20 commits
      .map(c => `- ${c.message.split('\n')[0]}`)
      .join('\n');

    const prompt = `Analyze these Git commit messages and provide a brief summary of the project's recent activity:\n\n${commitMessages}\n\nProvide a concise 2-3 sentence summary.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that analyzes Git commit history.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 150
    });

    res.json({
      summary: completion.choices[0].message.content,
      aiEnabled: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
