import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: December 13, 2025</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                This is a demonstration e-commerce platform created by Justin Wold to showcase
                full-stack development skills. This Privacy Policy is for demonstration purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                In a production environment, we would collect information you provide directly,
                such as account details, contact information, and preferences.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                This demonstration platform uses Firebase for authentication and data storage.
                Your information would be used to provide and improve the service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                This platform implements industry-standard security measures including Firebase
                Authentication and secure data transmission.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
              <p className="text-gray-700">
                For any questions about this Privacy Policy or the platform, please contact{' '}
                <a href="mailto:Justin.wold88@gmail.com" className="text-primary-600 hover:underline">
                  Justin.wold88@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
