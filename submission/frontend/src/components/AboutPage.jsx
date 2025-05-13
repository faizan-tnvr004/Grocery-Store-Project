import React from 'react';
import './AboutPage.css'; // Ensure this CSS file is correctly linked
import TopNavBar from './TopNavBar';
const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
       <TopNavBar />
      <section className="about-hero">
        <div className="hero-content">

          <h1>HF Grocery Store</h1>
          <p>Freshness delivered to your doorstep</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mission-section">
        <h2>Our Story</h2>
        <p className="story-text">
          HF Grocery Store was born from a simple idea: grocery shopping should be convenient, reliable, and enjoyable. We combine technology with traditional values of quality and customer service to revolutionize how you shop for groceries.
        </p>

        <div className="mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>To provide fresh, high-quality groceries with unparalleled convenience, saving you time while delivering exceptional value.</p>
          </div>
          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>To become the most trusted online grocery platform, known for quality products, fast delivery, and outstanding customer care.</p>
          </div>
          <div className="mission-card">
            <h3>Our Promise</h3>
            <p>Freshness guaranteed. If you're not satisfied with any product, we'll replace it or refund your money—no questions asked.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="icon">🛒</div>
            <h3>Convenience</h3>
            <p>Shop anytime, anywhere with our easy-to-use platform and fast delivery.</p>
          </div>
          <div className="value-item">
            <div className="icon">🌱</div>
            <h3>Freshness</h3>
            <p>We source directly from trusted suppliers to ensure peak freshness.</p>
          </div>
          <div className="value-item">
            <div className="icon">🤝</div>
            <h3>Integrity</h3>
            <p>Honest pricing, transparent sourcing, and ethical business practices.</p>
          </div>
          <div className="value-item">
            <div className="icon">❤️</div>
            <h3>Community</h3>
            <p>Supporting local producers and giving back to our communities.</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any inquiries or need assistance, feel free to reach out to our team:</p>
        <ul className="contact-list">
           <li><strong>Faizan Tanveer</strong> - Founder : 0335 107 1087</li>
           <li><strong>Hussain Farhan</strong> - CEO: 0324 460 1606</li>
                 </ul>
      </section>
    </div>
  );
};

export default AboutPage;