import React, { useEffect, useState } from 'react';

const AnalysisResult = ({ croppedImage, onReset, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result;

        const apiResponse = await fetch('http://localhost:8000/api/analyze-base64', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64data }),
        });

        if (!apiResponse.ok) throw new Error('API request failed');

        const analysisResult = await apiResponse.json();
        setResult(analysisResult);
        setIsAnalyzing(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult({
        isDeepfake: false,
        confidence: 0,
        details: 'Error analyzing image. Please try again.'
      });
      setIsAnalyzing(false);
    }
  };



  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Analysis Result</h2>
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
        {/* Image Container */}
        <div className="flex-1 min-h-[50vh] md:min-h-0 bg-white border rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 p-2 flex items-center justify-center">
            <img
              src={croppedImage}
              alt="Analysis preview"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex-1 flex flex-col gap-6 min-h-[300px] md:min-h-0">
          {!isAnalyzing && !result && (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <p className="text-gray-600 text-lg">Ready to analyze your image</p>
              <button
                onClick={handleAnalyze}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze Image
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              <p className="text-gray-600 text-lg">Analyzing image...</p>
            </div>
          )}

          {result && (
            <>
              <div className={`p-6 rounded-lg border ${result.isDeepfake ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
                {/* Keep existing result display */}
              </div>
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={onBack}
                  className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={onReset}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                >
                  New Analysis
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
