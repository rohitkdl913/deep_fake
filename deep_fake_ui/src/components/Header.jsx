import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">DeepFake Detector</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;