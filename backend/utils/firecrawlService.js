import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1/scrape';

/**
 * Scrape URL using Firecrawl API (Real scraping)
 * @param {string} url - URL to scrape
 * @returns {Promise<Object>} Scraped content
 */
export const scrapeWithFirecrawl = async (url) => {
  try {
    // Validate URL
    if (!isValidUrl(url)) {
      throw new Error('Invalid URL provided');
    }

    if (!FIRECRAWL_API_KEY) {
      throw new Error('Firecrawl API key is not set in .env file. Please add your API key to enable real web scraping.');
    }

    console.log(`Scraping with Firecrawl API: ${url}`);

    // Call Firecrawl API
    const response = await axios.post(
      FIRECRAWL_API_URL,
      {
        url: url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        waitFor: 2000,  // Wait for JavaScript to render
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

    console.log('Firecrawl response received');

    if (response.data && response.data.success) {
      const data = response.data.data;
      
      const scrapedData = {
        title: extractTitle(data.markdown || data.html || data.content),
        content: data.markdown || data.html || data.content,
        markdown: data.markdown,
        html: data.html,
        metadata: data.metadata || {},
        links: data.links || [],
        screenshot: data.screenshot,
        timestamp: new Date().toISOString()
      };

      console.log(`Successfully scraped content from ${url}`);
      return scrapedData;
    } else if (response.data && response.data.error) {
      throw new Error(`Firecrawl error: ${response.data.error}`);
    }

    throw new Error('Invalid response from Firecrawl API');

  } catch (error) {
    console.error('Scraping error:', error.message);
    
    // Network and DNS errors
    if (error.code === 'ENOTFOUND') {
      throw new Error('Network error: Cannot reach api.firecrawl.dev. Check your internet connection or try: ipconfig /flushdns');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Connection refused: Firecrawl service unavailable');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'EHOSTUNREACH') {
      throw new Error('Connection timeout: Firecrawl API is not responding. Check your internet connection');
    }
    
    // HTTP error codes
    if (error.response?.status === 403) {
      throw new Error('Site not supported: This website blocks automated scraping. Try a different URL. Suggested: news sites, documentation, or public content pages');
    } else if (error.response?.status === 401) {
      throw new Error('Authentication failed: Invalid Firecrawl API key');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded: Please try again later');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request: ' + (error.response.data?.error || error.message));
    }
    
    throw error;
  }
};

/**
 * Validate if URL is proper format
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Extract title from markdown/HTML content
 */
function extractTitle(content) {
  if (!content) return 'Coastal Hazard Alert';

  // Try to find first heading
  const headingMatch = content.match(/^#+\s+(.+)/m);
  if (headingMatch) {
    return headingMatch[1];
  }

  // Try to find first h1 tag
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    return h1Match[1];
  }

  // Try to find first sentence
  const sentenceMatch = content.match(/^[^.\n]{1,100}/);
  return sentenceMatch ? sentenceMatch[0] : 'Coastal Hazard Alert';
}
