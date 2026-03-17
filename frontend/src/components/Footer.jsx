import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <p>The Ocean Alert System provides real-time hazard warnings and safety information for maritime and fishing communities.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#alerts">Active Alerts</a></li>
            <li><a href="#documentation">Documentation</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@oceanalert.gov">info@oceanalert.gov</a></li>
            <li><a href="tel:+1-800-555-0123">+1 (800) 555-0123</a></li>
            <li>24/7 Support Available</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Ocean Alert System. All rights reserved.</p>
        <p>Government-Certified Maritime Safety Platform</p>
      </div>
    </footer>
  );
}
