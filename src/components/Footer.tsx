import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001f3f] text-white py-3">
      <div className="container mx-auto px-2">
        <div className="footer-logo mb-2">
          <h2 className="text-xl font-bold">PDF Summarizer</h2>
          <p className="text-sm">
            Simplify your reading with AI-powered summaries
          </p>
        </div>
        <nav className="footer-links mb-2">
          <a
            href="/privacy"
            className="text-white hover:text-[#f1c40f] mx-2 text-xs"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-white hover:text-[#f1c40f] mx-2 text-xs"
          >
            Terms of Service
          </a>
        </nav>
        <div className="social-links mb-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#f1c40f] mx-2 text-xs"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#f1c40f] mx-2 text-xs"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#f1c40f] mx-2 text-xs"
          >
            LinkedIn
          </a>
        </div>
        <div className="copyright text-center text-xs mt-2">
          © {new Date().getFullYear()} PDF Summarizer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
