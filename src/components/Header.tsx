import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#0056b3] text-white py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="header-logo">
          <h1 className="text-2xl font-bold">PDF Summarizer</h1>
        </div>
        <nav className="header-links space-x-4">
          <a
            href="/"
            className="text-white text-lg hover:bg-white hover:text-[#0056b3] px-3 py-2 rounded-md transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white text-lg hover:bg-white hover:text-[#0056b3] px-3 py-2 rounded-md transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white text-lg hover:bg-white hover:text-[#0056b3] px-3 py-2 rounded-md transition-colors duration-300"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
