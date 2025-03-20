import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About DeepFake Detector</h2>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                DeepFake Detector is a cutting-edge application designed to identify manipulated and synthetic media.
                Our mission is to help people distinguish between authentic content and artificially generated
                or manipulated media, promoting digital truth in an increasingly complex media landscape.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Technology</h3>
              <p className="text-gray-600 mb-6">
                DeepFake Detector uses advanced machine learning algorithms and computer vision techniques
                to analyze images and videos for signs of manipulation. Our technology examines inconsistencies
                in facial features, unusual blending patterns, unnatural movements, and other telltale signs
                that might not be apparent to the human eye.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h3>
              <ol className="list-decimal pl-6 mb-6 text-gray-600">
                <li className="mb-2">Upload an image or video for analysis</li>
                <li className="mb-2">Our AI analyzes the content using multiple detection methods</li>
                <li className="mb-2">A comprehensive report is generated highlighting potential manipulations</li>
                <li className="mb-2">Visual cues and explanations help you understand the results</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Team</h3>
              <p className="text-gray-600 mb-6">
                DeepFake Detector was developed by a diverse team of AI researchers, computer vision specialists,
                and digital media experts committed to promoting media authenticity. Our team continues to
                improve and refine our detection algorithms as synthetic media technology advances.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Privacy Commitment</h3>
              <p className="text-gray-600 mb-6">
                We take privacy seriously. All images and videos uploaded to our platform are processed
                securely, and we do not store your media after analysis unless you explicitly opt-in.
                Your trust is important to us, and we are committed to transparent data practices.
              </p>

              <div className="bg-indigo-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Get Involved</h3>
                <p className="text-indigo-700 mb-4">
                  We believe in the power of collaboration. If you're interested in contributing to the
                  development of DeepFake Detector or partnering with us, please reach out at:
                </p>
                <a href="mailto:contact@deepfakedetector.com" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  contact@deepfakedetector.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default About;