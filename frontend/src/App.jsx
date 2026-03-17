import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SocialFeed from './components/SocialFeed';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      // Get text first to debug
      const text = await response.text();
      
      // Check if response is empty
      if (!text) {
        console.error('Empty response from server');
        setPosts([]);
        setLoading(false);
        return;
      }

      // Parse JSON
      const data = JSON.parse(text);
      
      if (data.success && Array.isArray(data.posts)) {
        // Sort by newest first
        const sorted = data.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sorted);
      } else if (Array.isArray(data)) {
        // Sort by newest first
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sorted);
      } else {
        console.warn('Unexpected response format:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount and set up polling
  useEffect(() => {
    fetchPosts();
    
    // Auto-refresh feed every 3 seconds for live updates
    const interval = setInterval(fetchPosts, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch posts when refresh key changes (manual refresh or after scrape/post)
  useEffect(() => {
    if (refreshKey > 0) {
      fetchPosts();
    }
  }, [refreshKey]);

  // Handle create post
  const handleCreatePost = async (postData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      if (data.success) {
        setRefreshKey(prev => prev + 1);
        return data;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navigation />
      <Header />
      <Hero />
      
      <div className="app-main">
        <div className="container">
          <SocialFeed 
            posts={posts} 
            loading={loading} 
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
