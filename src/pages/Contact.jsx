import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

export default function Contact({ onOpenSearch }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="contact-main">
        <div className="contact-container">
          {/* Header */}
          <header className="contact-header">
            <span className="contact-tag">CONTACT</span>
            <h1 className="contact-title">GET IN TOUCH</h1>
            <p className="contact-subtitle">
              "Have a question, suggestion, or simply want to say hello? We'd love to hear from you."
            </p>
          </header>

          <div className="contact-grid">
            {/* Form Section */}
            <div className="contact-form-card">
              {isSubmitted ? (
                <div className="contact-success-state" role="status" aria-live="polite">
                  <div className="contact-success-icon">✓</div>
                  <h2 className="contact-success-title">Thank you! We'll get back to you soon.</h2>
                  <p className="contact-success-desc">
                    Your note has been received. Our team carefully reviews every message and will respond within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="contact-send-another-btn"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate={false}>
                  <div className="contact-form-row">
                    <div className="contact-field-group">
                      <label htmlFor="contact-name" className="contact-label">
                        Name <span className="required-star">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="contact-input"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <label htmlFor="contact-email" className="contact-label">
                        Email <span className="required-star">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="contact-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-subject" className="contact-label">
                      Subject <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className="contact-input"
                      required
                    />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-message" className="contact-label">
                      Message <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your note here..."
                      className="contact-textarea"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>

            {/* Information Sidebar */}
            <aside className="contact-info-panel" aria-label="Contact information">
              <div className="contact-info-block">
                <h2 className="contact-info-title">CONTACT</h2>
                <div className="contact-info-divider"></div>
                <a href="mailto:hello@aestia.com" className="contact-info-link">
                  hello@aestia.com
                </a>
              </div>

              <div className="contact-info-block">
                <h2 className="contact-info-title">FOLLOW</h2>
                <div className="contact-info-divider"></div>
                <div className="contact-social-links">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-item"
                  >
                    <span>Instagram</span>
                    <span className="social-arrow">↗</span>
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-item"
                  >
                    <span>Pinterest</span>
                    <span className="social-arrow">↗</span>
                  </a>
                </div>
              </div>

              <div className="contact-hours-block">
                <h3 className="contact-hours-title">CUSTOMER CARE</h3>
                <p className="contact-hours-desc">
                  Monday – Friday: 9:00 AM – 6:00 PM EST<br />
                  Thoughtfully answered from our studio.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
