import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Lightbulb, Rocket, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Tech Gear!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of modern e-commerce development by Justin Wold
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to My Tech & Fashion Store</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                This e-commerce platform is a comprehensive demonstration of modern web development skills, 
                showcasing the ability to build full-featured, production-ready applications using cutting-edge technologies.
              </p>
              
              <p>
                Built with React, TypeScript, Firebase, and a suite of modern tools, this project demonstrates 
                proficiency in creating scalable, maintainable, and user-friendly web applications.
              </p>

              <p>
                Every feature—from real-time inventory management to secure authentication—has been thoughtfully 
                implemented to showcase best practices in software development.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <Code className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Tech Stack</h3>
              <p className="text-gray-700">
                Built with React, TypeScript, Redux, Firebase, and Tailwind CSS for a robust, scalable architecture.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <Lightbulb className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Design</h3>
              <p className="text-gray-700">
                Responsive, accessible UI/UX with attention to detail and user experience best practices.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <Rocket className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full-Featured</h3>
              <p className="text-gray-700">
                Authentication, real-time database, shopping cart, product management, and task tracking.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
              <Heart className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crafted with Care</h3>
              <p className="text-gray-700">
                Every line of code written with attention to performance, security, and maintainability.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Impressed by What You See?</h2>
            <p className="text-lg mb-6 opacity-90">
              I'm available for hire and ready to bring this level of quality to your next project.
            </p>
            <Link
              to="/career"
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Learn More About Working Together
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
