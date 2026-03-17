import React, { useState } from 'react';
import './ScraperPanel.css';

export default function ScraperPanel({ onScrape, onCreatePost }) {
  const [activeTab, setActiveTab] = useState('post');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Create post state
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postHazardType, setPostHazardType] = useState('unspecified');
  const [postLocation, setPostLocation] = useState('');
  const [community, setCommunity] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!postTitle.trim() || !postContent.trim()) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await onCreatePost({
        title: postTitle,
        content: postContent,
        hazardType: postHazardType,
        location: postLocation,
        community
      });

      setSuccessMessage('Post created successfully!');

      // Reset form
      setPostTitle('');
      setPostContent('');
      setPostHazardType('unspecified');
      setPostLocation('');
      setCommunity('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message || '❌ Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapeOceanNews = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/scrape-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to scrape ocean news');
      }

      if (data.success) {
        setSuccessMessage(data.message || 'Ocean news updated successfully!');
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to scrape ocean news');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scraper-panel">
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          Create Post
        </button>
        <button
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Live Ocean News
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
          {errorMessage.includes('FIRECRAWL_API_KEY') && (
            <div className="alert-help">
              <a href="https://www.firecrawl.dev/" target="_blank" rel="noopener noreferrer">
                Get free API key
              </a>
            </div>
          )}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      <div className="panel-content">
        {activeTab === 'post' && (
          <div className="create-section">
          <form onSubmit={handleCreatePost} className="create-post-form">
            <h3>Create New Post</h3>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                placeholder="e.g., Tsunami Alert - Tamil Nadu Coast"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Description/Content *</label>
              <textarea
                placeholder="Share details about the coastal hazard, observations, or safety recommendations..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                disabled={isLoading}
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Hazard Type</label>
                <select
                  value={postHazardType}
                  onChange={(e) => setPostHazardType(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="unspecified">Unspecified</option>
                  <option value="tsunami">Tsunami</option>
                  <option value="storm_surge">Storm Surge</option>
                  <option value="cyclone">Cyclone</option>
                  <option value="high_waves">High Waves</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g., Mumbai Coast"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Community/Organization</label>
              <input
                type="text"
                placeholder="e.g., Tamil Nadu Fishermen Association"
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>

            <p className="form-hint">
              Community reports help spread awareness faster than official channels alone.
            </p>
            </form>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="news-section">
            <h3>Automated Ocean News Feed</h3>
            <p className="news-description">
              Get live news about oceans, fishing, coastal hazards, and maritime weather automatically updated every 30 minutes.
            </p>

            <div className="news-info-box">
              <h4>News Sources</h4>
              <ul>
                <li>BBC Science & Environment</li>
                <li>Marine Conservancy</li>
                <li>UN Development Programme</li>
              </ul>

              <h4>What We Track</h4>
              <ul>
                <li>Ocean & coastal news</li>
                <li>Fishing & maritime information</li>
                <li>Hazard alerts & warnings</li>
                <li>Weather & storm information</li>
              </ul>
            </div>

            <button
              onClick={handleScrapeOceanNews}
              disabled={isLoading}
              className="submit-btn"
            >
              {isLoading ? 'Fetching News...' : 'Fetch Latest Ocean News'}
            </button>

            <p className="form-hint">
              News is automatically fetched every 30 minutes. Click above to get the latest updates now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
