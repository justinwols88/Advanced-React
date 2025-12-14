import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';

export const FloatingNewsletter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setEmail('');
    setIsSubmitting(false);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setIsSubscribed(false), 300);
    }, 2000);
  };

  if (isClosed) return null;

  return (
    <>
      {/* Floating Icon Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-primary-500/50 active:scale-95"
        aria-label="Newsletter subscription"
        title="Subscribe to our newsletter"
      >
        <Mail className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-accent-500"></span>
        </span>
      </button>

      {/* Expandable Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-80 animate-slide-up rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close newsletter"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          {!isSubscribed ? (
            <>
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-100 to-secondary-100">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Join Our Newsletter
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Get exclusive deals, product updates, and shopping tips delivered to your inbox!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-primary-700 hover:to-secondary-700 hover:shadow-lg hover:shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>

              <p className="mt-3 text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-3 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                You're Subscribed!
              </h3>
              <p className="text-sm text-gray-600">
                Thank you for joining our newsletter. Check your inbox for a welcome email!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingNewsletter;
