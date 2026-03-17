import mongoose from 'mongoose';

// Post Schema
const postSchema = new mongoose.Schema({
  _id: String,
  id: String,
  title: String,
  content: String,
  image: String,
  source: String,
  sourceURL: String,
  hazardType: String,
  priority: { type: String, default: 'normal' },
  timestamp: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  upvotes: { type: Number, default: 0 },
  comments: [String],
  metadata: mongoose.Schema.Types.Mixed
}, { collection: 'posts', timestamps: true });

let Post = null;
let isConnected = false;

/**
 * Connect to MongoDB
 */
export async function connectMongoDB() {
  try {
    if (isConnected) return;

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('MONGODB_URI not set - using local JSON storage');
      return false;
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    Post = mongoose.model('Post', postSchema);
    isConnected = true;
    console.log('✓ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.warn('Falling back to local JSON storage');
    return false;
  }
}

/**
 * Get all posts from MongoDB
 */
export async function getAllPostsMongo() {
  if (!isConnected || !Post) return [];

  try {
    const posts = await Post.find()
      .sort({ priority: 1, timestamp: -1 })
      .lean();

    const priorityOrder = { critical: 0, high: 1, normal: 2 };
    return posts.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  } catch (error) {
    console.error('Error fetching posts from MongoDB:', error);
    return [];
  }
}

/**
 * Add post to MongoDB
 */
export async function addPostMongo(postData) {
  if (!isConnected || !Post) return null;

  try {
    const postId = Date.now().toString();
    const newPost = new Post({
      _id: postId,
      id: postId,
      ...postData,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      verified: postData.verified || false
    });

    const savedPost = await newPost.save();
    console.log(`✓ Added post: ${postData.title}`);
    return savedPost.toObject();
  } catch (error) {
    console.error('Error adding post to MongoDB:', error);
    return null;
  }
}

/**
 * Check if post URL exists in MongoDB
 */
export async function checkDuplicateMongo(url) {
  if (!isConnected || !Post) return false;

  try {
    const exists = await Post.findOne({ sourceURL: url });
    return !!exists;
  } catch (error) {
    console.error('Error checking duplicate:', error);
    return false;
  }
}

/**
 * Disconnect MongoDB
 */
export async function disconnectMongoDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  }
}
