import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getGitInstance, isGitRepository, getDiff, getBranchInfo } from '../utils/gitHelper.js';

const router = express.Router();

// Get commit history (kept for backward compatibility)
router.get('/commits', authenticate, async (req, res) => {
  try {
    const { repoPath } = req.query;
    const { getCommitHistory } = await import('../utils/gitHelper.js');
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const commits = await getCommitHistory(repoPath, 100);
    const branchInfo = await getBranchInfo(repoPath);

    res.json({ 
      commits, 
      branch: branchInfo.current || 'main' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get diff between two commits
router.get('/diff/:commitA/:commitB', authenticate, async (req, res) => {
  try {
    const { commitA, commitB } = req.params;
    const { repoPath } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const diff = await getDiff(repoPath, commitA, commitB);
    res.json({ diff, commitA, commitB });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get branch insights
router.get('/branches', authenticate, async (req, res) => {
  try {
    const { repoPath } = req.query;
    
    const isRepo = await isGitRepository(repoPath);
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const branchInfo = await getBranchInfo(repoPath);
    res.json(branchInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get repository info
router.get('/info', authenticate, async (req, res) => {
  try {
    const { repoPath } = req.query;
    const git = getGitInstance(repoPath);

    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      return res.status(400).json({ message: 'Not a git repository' });
    }

    const remotes = await git.getRemotes(true);
    const branches = await git.branchLocal();
    const status = await git.status();

    res.json({
      remotes: remotes.map(r => ({ name: r.name, refs: r.refs })),
      branches: branches.all,
      currentBranch: branches.current,
      status: {
        current: status.current,
        tracking: status.tracking,
        ahead: status.ahead,
        behind: status.behind
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

