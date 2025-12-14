import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
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
            <FileText className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: December 13, 2025</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                This is a demonstration e-commerce platform created by Justin Wold to showcase
                full-stack development skills. These Terms of Service are for demonstration purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using this demonstration platform, you acknowledge that this is
                a portfolio project showcasing technical capabilities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use of Service</h2>
              <p className="text-gray-700 mb-4">
                This platform demonstrates e-commerce functionality including user authentication,
                shopping cart management, product browsing, and task management features.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User Accounts</h2>
              <p className="text-gray-700 mb-4">
                Account creation uses Firebase Authentication. In a production environment,
                users would be responsible for maintaining account security.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                This platform was designed and developed by Justin Wold as a portfolio piece
                demonstrating modern web development practices.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
              <p className="text-gray-700">
                For questions about these Terms or the platform, contact{' '}
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

export default TermsPage;
