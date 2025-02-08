import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      history.push("/login");
    } else {
      history.push("/login");
    }
  };

  return (
    <header className="bg-[#0056b3] text-white py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="header-logo">
          <h1 className="text-2xl font-bold">PDF Summarizer</h1>
        </div>
        <nav className="header-links space-x-4 flex items-center">
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
          <a
            href="/pricing"
            className="text-white text-lg hover:bg-white hover:text-[#0056b3] px-3 py-2 rounded-md transition-colors duration-300"
          >
            Pricing
          </a>

          {/* Login/Logout Button */}
          <button
            onClick={handleAuthClick}
            className="bg-white text-[#0056b3] text-lg px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
