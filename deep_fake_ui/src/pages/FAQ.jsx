import React, { useState } from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 prose">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What are deepfakes?",
      answer: "Deepfakes are synthetic media in which a person in an existing image or video is replaced with someone else's likeness using artificial intelligence and deep learning techniques. The term combines 'deep learning' and 'fake,' highlighting the AI technology used to create these convincing but fabricated media files."
    },
    {
      question: "How does DeepFake Detector work?",
      answer: "Our DeepFake Detector uses a combination of computer vision and machine learning algorithms to analyze images and videos. It looks for inconsistencies that humans might miss, such as unnatural facial movements, inconsistent lighting, blending artifacts, and unusual pixel patterns. The system compares the analyzed media against known patterns of both authentic and manipulated content."
    },
    {
      question: "How accurate is DeepFake Detector?",
      answer: "Our current system achieves an accuracy rate of approximately 94% in controlled tests. However, detection accuracy varies depending on the quality and sophistication of the deepfake. As deepfake technology evolves, we continuously update and improve our detection algorithms to maintain high accuracy rates."
    },
    {
      question: "What file types does DeepFake Detector support?",
      answer: "DeepFake Detector supports common image formats including JPEG, PNG, and WebP. For videos, we support MP4, MOV, and WebM formats. The maximum file size for images is 10MB and for videos is 100MB. Higher resolution images and videos generally yield more accurate detection results."
    },
    {
      question: "How do I use DeepFake Detector?",
      answer: "Using DeepFake Detector is simple. Upload an image or video through our interface, then use our cropping tool to focus on the area you want to analyze (usually a face). Click 'Analyze,' and our system will process the media and provide you with a detailed report indicating whether the content appears to be authentic or manipulated, along with confidence scores and highlighted areas of concern."
    },
    {
      question: "Is my data secure when I use DeepFake Detector?",
      answer: "Yes, we take data security and privacy seriously. All uploaded content is encrypted during transit and processing. By default, we do not store your uploaded media after analysis is complete. All temporary files are automatically deleted within 24 hours. You can also manually delete your uploads immediately after analysis."
    },
    {
      question: "Can DeepFake Detector analyze live video?",
      answer: "Currently, our system works with pre-recorded media files. Real-time analysis of live video streams is under development and will be available in future updates. For time-sensitive analysis needs, we recommend uploading shorter video clips for faster processing."
    },
    {
      question: "Are there limitations to what DeepFake Detector can identify?",
      answer: "Yes. While our technology is advanced, extremely high-quality deepfakes created with cutting-edge technology can sometimes evade detection. Additionally, heavily compressed images or videos, very low-resolution media, or content that has been modified multiple times may yield less reliable results. We clearly indicate the confidence level of our analysis to help users understand potential limitations."
    },
    {
      question: "Can DeepFake Detector be fooled?",
      answer: "No detection system is 100% foolproof. As deepfake technology improves, creators of synthetic media develop new techniques to avoid detection. This is why we continuously update our algorithms and use multiple detection methods simultaneously. When our system returns a borderline result, we always recommend careful human review and consideration of the content's context."
    },
    {
      question: "Is there an API available for developers?",
      answer: "Yes, we offer a developer API for integrating DeepFake Detector into your own applications or workflows. The API provides the same analysis capabilities as our web interface but allows for automated processing. Please contact our team for API documentation, pricing, and access credentials."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8">Find answers to the most common questions about DeepFake Detector and deepfake technology.</p>
            
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            
            <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">Still have questions?</h3>
              <p className="text-indigo-700 mb-4">
                If you couldn't find the answer you were looking for, please reach out to our support team.
                We're here to help!
              </p>
              <a 
                href="mailto:support@deepfakedetector.com" 
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      
    <Footer></Footer>
    </div>
  );
};

export default FAQ;