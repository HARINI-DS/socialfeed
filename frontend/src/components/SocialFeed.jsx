import React from 'react';
import PostCard from './PostCard';
import './SocialFeed.css';

export default function SocialFeed({ posts, loading, onRefresh }) {
  // Calculate stats
  const stats = {
    critical: posts.filter(p => p.priority === 'critical').length,
    high: posts.filter(p => p.priority === 'high').length,
    info: posts.filter(p => p.priority === 'normal').length,
    total: posts.length
  };

  return (
    <div className="social-feed">
      <div className="feed-stats-section">
        <div className="stat-card critical">
          <div className="stat-icon">●</div>
          <div className="stat-label">Critical Alerts</div>
          <div className="stat-value">{stats.critical}</div>
        </div>
        <div className="stat-card high">
          <div className="stat-icon">◐</div>
          <div className="stat-label">High Priority</div>
          <div className="stat-value">{stats.high}</div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">◆</div>
          <div className="stat-label">Information</div>
          <div className="stat-value">{stats.info}</div>
        </div>
        <div className="stat-card total">
          <div className="stat-icon">≡</div>
          <div className="stat-label">Total Posts</div>
          <div className="stat-value">{stats.total}</div>
        </div>
      </div>

      <div className="feed-controls">
        <div className="control-left">
          <input type="text" placeholder="Search posts..." className="search-input" />
        </div>
        <div className="control-right">
          <button onClick={onRefresh} disabled={loading} className="refresh-btn">
            {loading ? 'Refreshing...' : 'Refresh Feed'}
          </button>
        </div>
      </div>

      <div className="feed-header">
        <h2>Alert Feed</h2>
        <span className="feed-count">{posts.length} Posts</span>
      </div>

      {loading && posts.length === 0 && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <p>No posted alerts yet. Check back soon!</p>
        </div>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="grid-post-card">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
