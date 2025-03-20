import React from 'react';

const AnalysisResult = ({ croppedImage, isAnalyzing, result, onAnalyze, onReset }) => {
  const handleAnalyze = async () => {
    onAnalyze();
    
    try {
      // Convert cropped image to base64
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64data = reader.result;
        
        // Send to API
        const apiResponse = await fetch('http://localhost:8000/api/analyze-base64', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64data
          }),
        });
        
        if (!apiResponse.ok) {
          throw new Error('API request failed');
        }
        
        const analysisResult = await apiResponse.json();
        // Update result state with API response
        onAnalyze(false, analysisResult);
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error analyzing image:', error);
      onAnalyze(false, {
        isDeepfake: false,
        confidence: 0,
        details: 'Error analyzing image. Please try again.'
      });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analysis Result</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="border rounded-lg overflow-hidden">
            <img src={croppedImage} alt="Cropped image" className="w-full" />
          </div>
        </div>
        
        <div>
          {!isAnalyzing && !result && (
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-gray-600 mb-6">Ready to analyze your image</p>
              <button 
                onClick={handleAnalyze}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Analyze Image
              </button>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Analyzing image for deepfake indicators...</p>
            </div>
          )}
          
          {result && (
            <div className="h-full flex flex-col">
              <div className={`p-6 rounded-lg border ${
                result.isDeepfake 
                  ? "bg-red-50 border-red-200" 
                  : "bg-green-50 border-green-200"
              }`}>
                <div className="flex items-center mb-4">
                  {result.isDeepfake ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <h3 className={`ml-3 text-xl font-semibold ${
                    result.isDeepfake ? "text-red-800" : "text-green-800"
                  }`}>
                    {result.isDeepfake ? "Deepfake Detected" : "Authentic Image"}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <p className="font-medium mb-1">Confidence Score:</p>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        result.isDeepfake ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm mt-1">{result.confidence}%</p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Analysis Details:</p>
                  <p className="text-gray-700">{result.details}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <button 
                  onClick={onReset}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
