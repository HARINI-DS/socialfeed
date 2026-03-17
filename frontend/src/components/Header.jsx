import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        const posts = Array.isArray(data) ? data : (data.posts || []);
        setPostCount(posts.length);
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };
    fetchCount();
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">Coastal Hazard Awareness Feed</h1>
          <p className="tagline">Real-time maritime alerts for fishermen</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-label">Active Posts</span>
            <span className="stat-value">{postCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Updates</span>
            <span className="stat-value">Every 3s</span>
          </div>
        </div>
      </div>
    </header>
  );
}
