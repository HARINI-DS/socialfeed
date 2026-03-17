import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/posts.json');
const dataDir = path.dirname(dataFilePath);

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    console.log(`Creating data directory: ${dataDir}`);
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Initialize data file if it doesn't exist
 */
function initializeDataFile() {
  ensureDataDir();
  if (!fs.existsSync(dataFilePath)) {
    console.log(`Initializing posts.json`);
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
  }
}

/**
 * Read all posts from file
 */
function readPostsFile() {
  initializeDataFile();
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    
    // Handle empty file
    if (!data || data.trim() === '') {
      console.warn('Posts file is empty, initializing...');
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing posts file:', error.message);
    // If file is corrupted, reset it
    console.log('Resetting corrupted posts file...');
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
    return [];
  }
}

/**
 * Write posts to file
 */
function writePostsFile(posts) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error writing posts file:', error);
  }
}

/**
 * Get all posts sorted by priority and timestamp
 */
export function getAllPosts() {
  const posts = readPostsFile();
  
  // Sort by priority (critical first) then by timestamp (newest first)
  return posts.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, normal: 2 };
    const priorityDiff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
    
    if (priorityDiff !== 0) return priorityDiff;
    
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}

/**
 * Add a new post
 */
export function addPost(postData) {
  const posts = readPostsFile();
  
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    timestamp: new Date().toISOString(),
    upvotes: 0,
    comments: [],
    verified: postData.verified || false
  };

  posts.push(newPost);
  writePostsFile(posts);

  return newPost;
}

/**
 * Get post by ID
 */
export function getPostById(id) {
  const posts = readPostsFile();
  return posts.find(post => post.id === id);
}

/**
 * Update post
 */
export function updatePost(id, updates) {
  const posts = readPostsFile();
  const index = posts.findIndex(post => post.id === id);

  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    writePostsFile(posts);
    return posts[index];
  }

  return null;
}

/**
 * Delete post
 */
export function deletePost(id) {
  const posts = readPostsFile();
  const filtered = posts.filter(post => post.id !== id);
  writePostsFile(filtered);
  return true;
}

/**
 * Upvote a post
 */
export function upvotePost(id) {
  const post = getPostById(id);
  if (post) {
    return updatePost(id, { upvotes: (post.upvotes || 0) + 1 });
  }
  return null;
}

/**
 * Get posts by hazard type
 */
export function getPostsByHazardType(hazardType) {
  return readPostsFile().filter(post => post.hazardType === hazardType);
}

/**
 * Get critical posts only
 */
export function getCriticalPosts() {
  return readPostsFile().filter(post => post.priority === 'critical');
}
