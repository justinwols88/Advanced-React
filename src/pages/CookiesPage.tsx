import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ArrowLeft } from 'lucide-react';

const CookiesPage: React.FC = () => {
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
            <Cookie className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last updated: December 13, 2025</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                This is a demonstration e-commerce platform created by Justin Wold to showcase
                full-stack development skills. This Cookie Policy is for demonstration purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files stored on your device to help websites function
                properly and provide analytics.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                This demonstration platform uses cookies for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Authentication and session management (Firebase)</li>
                <li>Shopping cart persistence (Redux with local storage)</li>
                <li>User preferences and settings</li>
                <li>Platform functionality and features</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Cookies Used</h2>
              <div className="text-gray-700 mb-4 space-y-4">
                <div>
                  <strong className="text-gray-900">Essential Cookies:</strong> Required for authentication
                  and basic platform functionality.
                </div>
                <div>
                  <strong className="text-gray-900">Functional Cookies:</strong> Remember your preferences
                  and settings across sessions.
                </div>
                <div>
                  <strong className="text-gray-900">Performance Cookies:</strong> Help understand how users
                  interact with the platform.
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. However, disabling cookies
                may affect platform functionality.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
              <p className="text-gray-700">
                For questions about this Cookie Policy, contact{' '}
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

export default CookiesPage;
