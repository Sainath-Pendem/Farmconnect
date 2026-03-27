import React from 'react';
import {  Mail, Phone } from 'lucide-react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer my-3">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-header">
              <img src="icon.png" alt=""></img>
              <span className="brand-title">FarmConnect</span>
            </div>
            <p className="brand-description">
              Connecting farmers directly with consumers, restaurants, and retailers for better prices,
              stronger relationships, and sustainable agriculture.
            </p>
          </div>

          <div className="footer-contact">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span className="contact-text">(+91)8008435075</span>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span className="contact-text">hello@farmconnect.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 FarmConnect. All rights reserved.</p>
          <div className="footer-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
