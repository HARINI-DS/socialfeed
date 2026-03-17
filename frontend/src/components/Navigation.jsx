import React from 'react';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">≡</div>
          <span className="logo-text">Ocean Alert System</span>
        </div>
        
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">Dashboard</a></li>
          <li><a href="#alerts" className="nav-link">Alerts</a></li>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>

        <div className="nav-right">
          <button className="btn-secondary">Contact</button>
        </div>
      </div>
    </nav>
  );
}
