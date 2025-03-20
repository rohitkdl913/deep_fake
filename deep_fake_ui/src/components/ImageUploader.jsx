import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageUpload(files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onImageUpload(files[0]);
    }
  };
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload an Image</h2>
      <p className="text-gray-600 mb-6">Upload an image to check if it's real or a deepfake</p>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-12 transition-colors ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 mb-4">Drag and drop your image here, or</p>
          <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Browse Files
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF (max 10MB)</p>
      </div>
    </div>
  );
};

export default ImageUploader;