import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Ocean & Marine Alert System</h1>
          <p className="hero-subtitle">
            Real-time monitoring and alerts for ocean hazards, maritime safety, 
            and coastal information from trusted sources worldwide.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">∿</span>
              <span className="feature-text">Ocean Hazards</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">◉</span>
              <span className="feature-text">Live Alerts</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⊙</span>
              <span className="feature-text">Global Sources</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">≡</span>
              <span className="feature-text">Real-time Data</span>
            </div>
          </div>
        </div>

        <div className="hero-info">
          <div className="info-box">
            <h3>What We Monitor</h3>
            <ul>
              <li>Tsunami & Storm Warnings</li>
              <li>Fishing Safety Information</li>
              <li>Marine Conservation Updates</li>
              <li>Ocean Environmental Changes</li>
              <li>Coastal Weather Alerts</li>
              <li>Maritime Incidents</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
