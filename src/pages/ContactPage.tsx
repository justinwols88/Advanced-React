import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/common/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:Justin.wold88@gmail.com" className="text-primary-600 hover:underline">
                    Justin.wold88@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+12063493679" className="text-gray-700 hover:text-primary-600">
                    +1 (206) 349-3679
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-700">
                    13421 24th Ave S Apt 4<br />
                    Seattle, WA 98168
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Looking to Hire?</h3>
              <p className="text-gray-700 mb-4">
                I'm currently available for freelance work and full-time opportunities. 
                Check out my career page to learn more about my skills and experience.
              </p>
              <a
                href="/career"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                View Career Page →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="How can I help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your message here..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  leftIcon={<Send />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
