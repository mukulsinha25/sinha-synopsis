import { useState } from "react";

function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mukulsinha25@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Get in Touch</h1>
        <p className="contact-intro">
          Ideas, collaborations, or just a hello — my inbox is always open.
        </p>

        <div className="contact-links">
          {/* Email */}
          <a
            href="mailto:mukulsinha25@gmail.com"
            className="contact-card"
          >
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
            </div>
            <div className="contact-card__info">
              <h3>Email</h3>
              <p>mukulsinha25@gmail.com</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mukulsinha25/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="4" />
                <path d="M8 11v5" />
                <path d="M8 8v.01" />
                <path d="M12 11v5" />
                <path d="M12 14c0-1.5 1-3 3-3s3 1.5 3 3v2" />
              </svg>
            </div>
            <div className="contact-card__info">
              <h3>LinkedIn</h3>
              <p>Mukul Sinha</p>
            </div>
          </a>
        </div>

        {/* Copy email button */}
        <button className="copy-email-btn" onClick={handleCopyEmail}>
          {copied ? "✓ Copied!" : "Copy email address"}
        </button>
      </div>
    </div>
  );
}

export default Contact;
