import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeFeed } from './controllers/feedController.js';
import { getPosts, createPost } from './controllers/postsController.js';
import { startNewsScraperService } from './services/newsScraperService.js';
import { connectMongoDB } from './utils/mongoStore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Routes
app.get('/api/feed', (req, res) => {
  try {
    res.json({ message: 'Social feed endpoint' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
app.get('/api/posts', getPosts);

// Create new post
app.post('/api/posts', createPost);

// Scrape coastal hazard information from web
app.post('/api/scrape-hazards', scrapeFeed);

// Manual trigger for automated news scraper
app.post('/api/scrape-news', async (req, res) => {
  try {
    const { scrapeRealTimeNews } = await import('./services/newsScraperService.js');
    const results = await scrapeRealTimeNews();
    res.json({
      success: true,
      message: `Successfully scraped real-time ocean news. Added ${results.length} new posts.`,
      postsAdded: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to scrape news',
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Try to connect to MongoDB (optional - uses JSON file if not available)
  console.log('Initializing database...');
  const mongoConnected = await connectMongoDB();
  if (mongoConnected) {
    console.log('Using MongoDB for persistent storage');
  } else {
    console.log('Using local JSON file for storage');
  }
  
  // Start automatic news scraper - every 30 seconds (fast enough without rate limits)
  startNewsScraperService(30);
});
