import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left: Logo and copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-orange-400">JobMartAI</h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} JobMartAI. All rights reserved.
          </p>
        </div>

        {/* Right: Navigation links */}
        <div className="flex space-x-6 text-sm">
          <a href="https://www.facebook.com/" className="hover:text-orange-300">
            FaceBook
          </a>
          <a href="https://www.whatsapp.com/" className="hover:text-orange-300">
            What'app
          </a>
          <a href="https://mail.google.com/" className="hover:text-orange-300">
            Gmail
          </a>
          <a href="https://x.com/" className="hover:text-orange-300">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
