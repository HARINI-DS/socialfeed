import { scrapeWithFirecrawl } from '../utils/firecrawlService.js';
import { addPost, getAllPosts } from '../utils/dataStore.js';

/**
 * Scrape coastal hazard information from web using Firecrawl
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const scrapeFeed = async (req, res) => {
  try {
    const { url, hazardType } = req.body;

    if (!url) {
      return res.status(400).json({ 
        success: false,
        error: 'URL is required' 
      });
    }

    // Check if URL was already scraped
    const existingPosts = getAllPosts();
    const duplicatePost = existingPosts.find(post => post.sourceURL === url);
    
    if (duplicatePost) {
      return res.status(409).json({
        success: false,
        error: 'This URL has already been scraped!',
        existingPost: duplicatePost,
        message: 'To scrape this content again, please use a different URL.'
      });
    }

    console.log(`Scraping ${hazardType || 'hazard'} data from: ${url}`);

    // Scrape content using Firecrawl
    const scrapedData = await scrapeWithFirecrawl(url);

    if (!scrapedData) {
      return res.status(404).json({ 
        success: false,
        error: 'Unable to scrape content from URL' 
      });
    }

    // Create post from scraped data
    const post = {
      title: scrapedData.title || 'Coastal Hazard Alert',
      content: scrapedData.markdown || scrapedData.html || scrapedData.content || '',
      source: 'web_scrape',
      sourceURL: url,
      hazardType: hazardType || 'unspecified',
      priority: determinePriority(scrapedData.markdown || scrapedData.content),
      timestamp: new Date().toISOString(),
      verified: false,
      metadata: scrapedData.metadata || {}
    };

    // Save to database
    const savedPost = addPost(post);

    res.status(201).json({
      success: true,
      message: 'Content scraped and posted successfully',
      post: savedPost
    });
  } catch (error) {
    console.error('Scraping error:', error);
    
    // Specific error messages
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.message.includes('FIRECRAWL_API_KEY')) {
      statusCode = 400;
      errorMessage = 'Firecrawl API key not configured. Add FIRECRAWL_API_KEY to backend/.env file';
    } else if (error.message.includes('Invalid URL')) {
      statusCode = 400;
      errorMessage = 'Invalid URL provided. Please enter a valid URL starting with http:// or https://';
    } else if (error.message.includes('Authentication')) {
      statusCode = 401;
      errorMessage = 'Invalid Firecrawl API key. Check your credentials in .env file';
    } else if (error.message.includes('Rate limit')) {
      statusCode = 429;
      errorMessage = 'Rate limit exceeded. Please try again in a few moments';
    } else if (error.message.includes('Site not supported')) {
      statusCode = 400;
      errorMessage = error.message; // Use the full message that suggests alternatives
    } else if (error.message.includes('Connection refused')) {
      statusCode = 503;
      errorMessage = 'Firecrawl service unavailable. Please try again later';
    } else if (error.message.includes('Network error')) {
      statusCode = 503;
      errorMessage = error.message;
    } else if (error.message.includes('Connection timeout')) {
      statusCode = 504;
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: error.message
    });
  }
};

/**
 * Determine priority level based on content keywords
 */
function determinePriority(content) {
  const urgentKeywords = [
    'emergency', 'urgent', 'warning', 'danger', 'evacuate', 
    'tsunami', 'storm surge', 'cyclone', 'alert', 'critical',
    'immediate', 'hazard', 'severe', 'extreme'
  ];
  const contentLower = (content || '').toLowerCase();

  const hasUrgent = urgentKeywords.some(keyword => contentLower.includes(keyword));
  return hasUrgent ? 'critical' : 'normal';
}
