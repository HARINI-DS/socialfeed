import { getAllPosts, addPost } from '../utils/dataStore.js';

/**
 * Get all posts from feed
 */
export const getPosts = (req, res) => {
  try {
    const posts = getAllPosts();
    
    // Ensure posts is always an array
    if (!Array.isArray(posts)) {
      console.warn('Posts is not an array, returning empty');
      return res.status(200).json({
        success: true,
        total: 0,
        posts: []
      });
    }

    res.status(200).json({
      success: true,
      total: posts.length,
      posts: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch posts',
      message: error.message
    });
  }
};

/**
 * Create a new post (for community reports)
 */
export const createPost = (req, res) => {
  try {
    const { title, content, hazardType, community, location } = req.body;

    if (!title || !content) {
      return res.status(400).json({ 
        success: false,
        error: 'Title and content are required' 
      });
    }

    const post = {
      title,
      content,
      hazardType: hazardType || 'unspecified',
      community: community || '',
      location: location || '',
      source: 'community_report',
      priority: 'normal',
      timestamp: new Date().toISOString(),
      verified: false,
      upvotes: 0
    };

    const savedPost = addPost(post);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: savedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create post',
      message: error.message
    });
  }
};
