import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0">
          {/* Brand */}
          <a href="/" className="flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-[#012A4A]">
              MockInterview
            </span>
          </a>

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-4 text-sm sm:text-base font-medium text-gray-600">
            <li><a href="/about" className="hover:text-[#012A4A]">About</a></li>
            <li><a href="#privacy" className="hover:text-[#012A4A]">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-[#012A4A]">Terms</a></li>
            <li><a href="#contact" className="hover:text-[#012A4A]">Contact</a></li>
          </ul>
        </div>

        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold text-[#012A4A]">MockInterview.ai</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
