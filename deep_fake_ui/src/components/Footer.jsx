import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium mb-2">DeepFake Detector</h3>
            <p className="text-gray-400 text-sm">Advanced AI-powered image verification tool</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} DeepFake Detector. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
