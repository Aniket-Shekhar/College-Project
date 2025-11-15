import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCommitHistory, isGitRepository } from '../utils/gitHelper.js';

const router = express.Router();

/**
 * GET /api/commits
 * Get all commits from the repository
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { repoPath, maxCount = 100 } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const commits = await getCommitHistory(repoPath, parseInt(maxCount));
    
    res.json({ 
      commits,
      count: commits.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/commits/:commitId
 * Get a specific commit by ID
 */
router.get('/:commitId', authenticate, async (req, res) => {
  try {
    const { commitId } = req.params;
    const { repoPath } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const commits = await getCommitHistory(repoPath, 1000);
    const commit = commits.find(c => c.id === commitId || c.shortId === commitId);
    
    if (!commit) {
      return res.status(404).json({ message: 'Commit not found' });
    }
    
    res.json(commit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

