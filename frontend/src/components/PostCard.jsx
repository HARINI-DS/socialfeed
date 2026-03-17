import React from 'react';
import { formatDistanceToNow } from '../utils/dateUtils';
import './PostCard.css';

export default function PostCard({ post }) {
  const getPriorityLabel = (priority) => {
    const labels = {
      critical: 'CRITICAL',
      high: 'HIGH',
      normal: 'INFORMATION'
    };
    return labels[priority] || 'INFORMATION';
  };

  const getHazardLabel = (hazardType) => {
    const labels = {
      tsunami: 'Tsunami',
      storm_surge: 'Storm Surge',
      cyclone: 'Cyclone',
      high_waves: 'High Waves',
      emergency: 'Emergency',
      weather: 'Weather',
      unspecified: 'Alert',
      flooding: 'Flooding'
    };
    return labels[hazardType] || 'Alert';
  };

  return (
    <div className={`post-item priority-${post.priority}`}>
      {post.image && (
        <div className="post-image-container">
          <img 
            src={post.image} 
            alt={post.title}
            className="post-image"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}

      <div className="post-header-bar">
        <span className={`priority-label priority-${post.priority}`}>
          {getPriorityLabel(post.priority)}
        </span>
        <span className="hazard-type">
          {getHazardLabel(post.hazardType)}
        </span>
        <span className="post-timestamp">
          {formatDistanceToNow(post.timestamp)}
        </span>
      </div>

      <h3 className="post-title">{post.title}</h3>

      <p className="post-excerpt">{truncateContent(post.content)}</p>

      <div className="post-footer">
        <div className="source-info">
          <span>{post.source === 'live_search' ? 'Live Search' : 'Web Scraped'}</span>
          {post.sourceURL && (
            <a href={post.sourceURL} target="_blank" rel="noopener noreferrer" className="source-link">
              View Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function truncateContent(content, maxLength = 150) {
  if (!content) return '';
  
  let text = content.replace(/[#*_`]/g, '');
  
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}
