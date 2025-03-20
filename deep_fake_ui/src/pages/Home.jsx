import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import ImageCropper from '../components/ImageCropper';
import AnalysisResult from '../components/AnalysisResult';
import Footer from '../components/Footer';

function Home() {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    
    const [activeStep, setActiveStep] = useState(0);

    const handleImageUpload = (file) => {
        setImage(URL.createObjectURL(file));
        setCroppedImage(null);
        setActiveStep(1);
    };

    const handleCropComplete = (croppedImg) => {
        setCroppedImage(croppedImg);
        setActiveStep(2);
    };

   

    const resetAll = () => {
        setImage(null);
        setCroppedImage(null);
        setActiveStep(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="mb-8">
                            <StepIndicator activeStep={activeStep} />
                        </div>

                        {activeStep === 0 && (
                            <ImageUploader onImageUpload={handleImageUpload} />
                        )}

                        {activeStep === 1 && image && (
                            <ImageCropper
                                image={image}
                                onCropComplete={handleCropComplete}
                                onBack={() => setActiveStep(0)}
                            />
                        )}

                        {activeStep === 2 && croppedImage && (
                            <AnalysisResult
                                croppedImage={croppedImage}
                                onReset={resetAll}
                                onBack={()=>setActiveStep(1)}
                            />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

const StepIndicator = ({ activeStep }) => {
    const steps = [
        "Upload Image",
        "Crop Image",
        "Analysis Result"
    ];

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${index === activeStep
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-500 border-gray-300"
                        }`}>
                        {index + 1}
                    </div>
                    <div className={`ml-2 text-sm ${index === activeStep ? "font-medium text-indigo-600" : "text-gray-500"
                        }`}>
                        {step}
                    </div>
                    {index < steps.length - 1 && (
                        <div className="w-12 h-px bg-gray-300 mx-2"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Home;