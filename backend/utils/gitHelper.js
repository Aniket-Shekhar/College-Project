import simpleGit from 'simple-git';

/**
 * Git Helper Utilities
 * Provides common Git operations using simple-git
 */

/**
 * Get Git instance for a repository path
 * @param {string} repoPath - Path to the Git repository
 * @returns {Object} simple-git instance
 */
export const getGitInstance = (repoPath = process.cwd()) => {
  return simpleGit(repoPath);
};

/**
 * Check if a path is a valid Git repository
 * @param {string} repoPath - Path to check
 * @returns {Promise<boolean>}
 */
export const isGitRepository = async (repoPath = process.cwd()) => {
  try {
    const git = getGitInstance(repoPath);
    return await git.checkIsRepo();
  } catch (error) {
    return false;
  }
};

/**
 * Get commit history with formatting
 * @param {string} repoPath - Path to repository
 * @param {number} maxCount - Maximum number of commits
 * @returns {Promise<Array>}
 */
export const getCommitHistory = async (repoPath = process.cwd(), maxCount = 100) => {
  try {
    const git = getGitInstance(repoPath);
    const isRepo = await git.checkIsRepo();
    
    if (!isRepo) {
      throw new Error('Not a git repository');
    }

    const log = await git.log({ maxCount, multiLine: true });
    const branches = await git.branchLocal();

    return log.all.map(commit => ({
      id: commit.hash,
      shortId: commit.hash.substring(0, 7),
      author: commit.author_name,
      email: commit.author_email,
      date: commit.date,
      message: commit.message,
      branch: branches.current || 'main',
      refs: commit.refs || ''
    }));
  } catch (error) {
    throw new Error(`Failed to get commit history: ${error.message}`);
  }
};

/**
 * Get diff between two commits
 * @param {string} repoPath - Path to repository
 * @param {string} commitA - First commit hash
 * @param {string} commitB - Second commit hash
 * @returns {Promise<string>}
 */
export const getDiff = async (repoPath = process.cwd(), commitA, commitB) => {
  try {
    const git = getGitInstance(repoPath);
    const isRepo = await git.checkIsRepo();
    
    if (!isRepo) {
      throw new Error('Not a git repository');
    }

    const diff = await git.diff([commitA, commitB]);
    return diff;
  } catch (error) {
    throw new Error(`Failed to get diff: ${error.message}`);
  }
};

/**
 * Get branch information and evolution
 * @param {string} repoPath - Path to repository
 * @returns {Promise<Object>}
 */
export const getBranchInfo = async (repoPath = process.cwd()) => {
  try {
    const git = getGitInstance(repoPath);
    const isRepo = await git.checkIsRepo();
    
    if (!isRepo) {
      throw new Error('Not a git repository');
    }

    const branches = await git.branchLocal();
    const branchList = branches.all;
    const currentBranch = branches.current;

    // Get commits per branch
    const branchCommits = {};
    for (const branch of branchList) {
      try {
        const log = await git.log({ from: branch, maxCount: 50 });
        branchCommits[branch] = log.all.length;
      } catch (error) {
        branchCommits[branch] = 0;
      }
    }

    return {
      branches: branchList,
      current: currentBranch,
      commits: branchCommits
    };
  } catch (error) {
    throw new Error(`Failed to get branch info: ${error.message}`);
  }
};

/**
 * Get contributor statistics
 * @param {string} repoPath - Path to repository
 * @returns {Promise<Array>}
 */
export const getContributors = async (repoPath = process.cwd()) => {
  try {
    const git = getGitInstance(repoPath);
    const isRepo = await git.checkIsRepo();
    
    if (!isRepo) {
      throw new Error('Not a git repository');
    }

    const log = await git.log({ maxCount: 1000 });
    const commits = log.all;

    const contributorMap = {};
    
    commits.forEach(commit => {
      const author = commit.author_name;
      const email = commit.author_email;
      
      if (!contributorMap[author]) {
        contributorMap[author] = {
          name: author,
          email: email,
          commits: 0,
          firstCommit: commit.date,
          lastCommit: commit.date
        };
      }
      
      contributorMap[author].commits++;
      
      const commitDate = new Date(commit.date);
      const firstDate = new Date(contributorMap[author].firstCommit);
      const lastDate = new Date(contributorMap[author].lastCommit);
      
      if (commitDate < firstDate) {
        contributorMap[author].firstCommit = commit.date;
      }
      if (commitDate > lastDate) {
        contributorMap[author].lastCommit = commit.date;
      }
    });

    return Object.values(contributorMap)
      .sort((a, b) => b.commits - a.commits);
  } catch (error) {
    throw new Error(`Failed to get contributors: ${error.message}`);
  }
};

