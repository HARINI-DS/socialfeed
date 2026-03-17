import axios from 'axios';
import dotenv from 'dotenv';
import { addPost, getAllPosts } from '../utils/dataStore.js';

dotenv.config();

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_SEARCH_URL = 'https://api.firecrawl.dev/v1/search';

// Comprehensive real-time search queries for ocean & marine topics
const SEARCH_QUERIES = [
  // Safety & Hazards
  'ocean hazards warnings today',
  'tsunami alerts maritime safety',
  'coastal storm warnings',
  'sea fishing weather alerts',
  'ocean weather marine alerts',
  'fishing safety rules',
  
  // Marine News & Updates
  'ocean news today',
  'marine conservation updates',
  'fisheries management news',
  'ocean pollution alerts',
  'marine life discoveries',
  
  // Environmental & Climate
  'sea level changes climate',
  'ocean temperature anomalies',
  'coastal erosion reports',
  'marine heatwave alerts',
  'ocean ecosystem changes',
  
  // Fishing & Industry
  'fishing industry updates',
  'marine resource management',
  'sustainable fishing practices',
  'fish stock reports',
  'oceanography research',
  
  // Disasters & Events
  'ocean disasters reports',
  'maritime accidents',
  'coastal flooding alerts',
  'underwater earthquakes',
  'ocean current changes',
  
  // Global Ocean Topics
  'world ocean news',
  'marine technology innovations',
  'ocean exploration updates',
  'underwater research',
  'ocean data reports'
];

/**
 * Search for real-time ocean & fishing news using Firecrawl Search API
 */
async function searchRealTimeNews(query) {
  try {
    console.log(`Searching real-time news: "${query}"`);

    if (!FIRECRAWL_API_KEY) {
      throw new Error('Firecrawl API key is not set in .env file');
    }

    // Use Firecrawl Search API for real-time news
    const response = await axios.post(
      FIRECRAWL_SEARCH_URL,
      {
        query: query,
        limit: 10,
        timeout: 30000
      },
      {
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    if (response.data && response.data.success) {
      const results = response.data.data || [];
      console.log(`Found ${results.length} results for: "${query}"`);
      return results;
    }

    return [];
  } catch (error) {
    console.error(`Error searching news for "${query}":`, error.message);
    return [];
  }
}

/**
 * Verify content is ocean-related
 */
function isOceanRelated(title, content) {
  const oceanKeywords = [
    // Ocean general
    'ocean', 'sea', 'marine', 'maritime', 'coastal', 'beach',
    'water', 'tide', 'wave', 'current', 'gulf', 'bay', 'strait',
    
    // Hazards & Safety
    'tsunami', 'storm surge', 'cyclone', 'typhoon', 'hurricane',
    'swell', 'rip current', 'flood', 'drowning', 'shipwreck',
    
    // Fishing & Marine Life
    'fishing', 'fish', 'marine life', 'whale', 'shark', 'coral',
    'fishery', 'seafood', 'aquatic', 'mollusc', 'shellfish',
    
    // Environmental
    'pollution', 'climate', 'conservation', 'ecosystem', 'species',
    'coral reef', 'mangrove', 'seagrass', 'plankton', 'kelp',
    
    // Operations
    'navy', 'port', 'harbor', 'dock', 'cruise', 'cargo ship',
    'sailboat', 'vessel', 'submarine', 'boat', 'shipping'
  ];
  
  const fullText = ((title || '') + ' ' + (content || '')).toLowerCase();
  return oceanKeywords.some(keyword => fullText.includes(keyword));
}

/**
 * Check if URL was already posted
 */
function isDuplicateUrl(url) {
  const posts = getAllPosts();
  return posts.some(post => post.sourceURL === url);
}

/**
 * Extract hazard type from content
 */
function extractHazardType(content) {
  const contentLower = (content || '').toLowerCase();
  
  if (contentLower.includes('tsunami')) return 'tsunami';
  if (contentLower.includes('storm surge') || contentLower.includes('storm')) return 'storm_surge';
  if (contentLower.includes('cyclone') || contentLower.includes('typhoon')) return 'cyclone';
  if (contentLower.includes('wave') || contentLower.includes('swell')) return 'high_waves';
  if (contentLower.includes('emergency') || contentLower.includes('alert')) return 'emergency';
  if (contentLower.includes('weather')) return 'weather';
  
  return 'unspecified';
}

/**
 * Determine priority from content
 */
function determinePriority(content) {
  const urgentKeywords = [
    'emergency', 'urgent', 'warning', 'danger', 'evacuate', 
    'tsunami', 'storm surge', 'cyclone', 'alert', 'critical',
    'immediate', 'hazard', 'severe', 'extreme', 'active'
  ];
  
  const contentLower = (content || '').toLowerCase();
  const hasUrgent = urgentKeywords.some(keyword => contentLower.includes(keyword));
  
  return hasUrgent ? 'critical' : 'high';
}

/**
 * Process search results and create posts
 */
async function processSearchResults(results) {
  const addedPosts = [];

  for (const result of results) {
    try {
      const url = result.url || '';
      
      // Skip if already posted
      if (isDuplicateUrl(url)) {
        console.log(`Duplicate URL: ${url}`);
        continue;
      }

      // Extract content
      const title = result.title || 'Ocean & Fishing News';
      const content = result.description || result.content || '';
      const image = result.image || result.og_image || null;
      
      if (!content || content.length < 20) {
        console.log(`Content too short: ${title}`);
        continue;
      }

      // Verify content is ocean-related
      if (!isOceanRelated(title, content)) {
        console.log(`Not ocean-related: ${title}`);
        continue;
      }

      // Create post
      const post = {
        title: title,
        content: content,
        source: 'live_search',
        sourceURL: url,
        hazardType: extractHazardType(title + ' ' + content),
        priority: determinePriority(title + ' ' + content),
        timestamp: new Date().toISOString(),
        verified: false,
        image: image,
        metadata: {
          autoScraped: true,
          searchBased: true
        }
      };

      // Save to database
      const savedPost = addPost(post);
      addedPosts.push(savedPost);
      console.log(`Added news: ${title}`);

      // Delay between posts to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Error processing result:', error.message);
    }
  }

  return addedPosts;
}

/**
 * Search all queries and add to feed
 */
export async function scrapeRealTimeNews() {
  console.log(`Searching real-time news at ${new Date().toISOString()}`);

  const allResults = [];

  for (const query of SEARCH_QUERIES) {
    const results = await searchRealTimeNews(query);
    allResults.push(...results);
    
    // Delay between searches
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Process all results and create posts
  const addedPosts = await processSearchResults(allResults);
  
  console.log(`Completed real-time news search. Added ${addedPosts.length} new posts.`);
  return addedPosts;
}

/**
 * Start automated news scraper
 */
export function startNewsScraperService(intervalSeconds = 3) {
  console.log(`Starting real-time news scraper service (interval: ${intervalSeconds} seconds)`);

  // Run immediately on start
  scrapeRealTimeNews();

  // Run every 3 seconds automatically
  setInterval(scrapeRealTimeNews, intervalSeconds * 1000);
}
