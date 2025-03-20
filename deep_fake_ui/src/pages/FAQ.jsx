import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component

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
      
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="font-semibold">DeepFake Detector</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">© 2025 DeepFake Detector. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;