import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/posts.json');
const dataDir = path.dirname(dataFilePath);

// Demo data for initial population
const DEMO_POSTS = [
  {
    "id": "demo-1",
    "title": "🌊 Ocean Temperature Rise Accelerates Global Warming",
    "content": "Recent studies show ocean temperatures rising 0.13°C per decade. Marine ecosystems facing unprecedented stress.",
    "source": "Ocean Watch Alliance",
    "sourceURL": "https://oceanwatchalliance.org",
    "hazardType": "climate",
    "priority": "critical",
    "timestamp": "2026-03-17T14:30:00Z",
    "verified": true,
    "upvotes": 24,
    "comments": []
  },
  {
    "id": "demo-2",
    "title": "⚠️ Tsunami Warning Alert - Indian Ocean Region",
    "content": "INCOIS issues tsunami alert following underwater seismic activity. Coastal communities advised to stay alert.",
    "source": "Indian Centre for Ocean Info Science",
    "sourceURL": "https://incois.gov.in",
    "hazardType": "tsunami",
    "priority": "critical",
    "timestamp": "2026-03-17T13:45:00Z",
    "verified": true,
    "upvotes": 156,
    "comments": []
  },
  {
    "id": "demo-3",
    "title": "🐟 Overfishing Crisis: Fish Stocks Down 50% in Past Decade",
    "content": "New report reveals alarming decline in global fish populations. Sustainable fishing practices urgently needed.",
    "source": "FAO Fisheries Report",
    "sourceURL": "https://fao.org/fisheries",
    "hazardType": "overfishing",
    "priority": "high",
    "timestamp": "2026-03-17T12:15:00Z",
    "verified": true,
    "upvotes": 89,
    "comments": []
  },
  {
    "id": "demo-4",
    "title": "🌪️ Cyclone Season Predictions Show Increased Storm Activity",
    "content": "Meteorological agencies predict above-normal cyclone activity this season across Bay of Bengal.",
    "source": "RSMC India",
    "sourceURL": "https://mausam.imd.gov.in",
    "hazardType": "storm",
    "priority": "high",
    "timestamp": "2026-03-17T11:00:00Z",
    "verified": true,
    "upvotes": 127,
    "comments": []
  },
  {
    "id": "demo-5",
    "title": "♻️ Coastal Pollution Reaches Historic Levels",
    "content": "Plastic waste contamination in coastal waters hits all-time high. Marine life affected across multiple species.",
    "source": "Ocean Cleanup Project",
    "sourceURL": "https://theoceancleanup.com",
    "hazardType": "pollution",
    "priority": "high",
    "timestamp": "2026-03-17T10:30:00Z",
    "verified": true,
    "upvotes": 203,
    "comments": []
  }
];

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
    console.log(`Initializing posts.json with demo data`);
    fs.writeFileSync(dataFilePath, JSON.stringify(DEMO_POSTS, null, 2));
  }
}

/**
 * Read all posts from file
 */
function readPostsFile() {
  initializeDataFile();
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    
    // Handle empty file - initialize with demo data
    if (!data || data.trim() === '') {
      console.warn('Posts file is empty, initializing with demo data...');
      fs.writeFileSync(dataFilePath, JSON.stringify(DEMO_POSTS, null, 2));
      return DEMO_POSTS;
    }
    
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing posts file:', error.message);
    // If file is corrupted, reset it with demo data
    console.log('Resetting corrupted posts file with demo data...');
    fs.writeFileSync(dataFilePath, JSON.stringify(DEMO_POSTS, null, 2));
    return DEMO_POSTS;
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
