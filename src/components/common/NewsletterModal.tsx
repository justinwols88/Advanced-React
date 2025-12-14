import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  console.log('NewsletterModal rendered, isOpen:', isOpen);

  useEffect(() => {
    console.log('NewsletterModal useEffect running');
    // Check if user has seen the newsletter popup before
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletterPopup');
    console.log('hasSeenNewsletter:', hasSeenNewsletter);
    
    // Always show for testing - remove this condition later
    // if (!hasSeenNewsletter) {
      // Show popup after 2 seconds delay
      const timer = setTimeout(() => {
        console.log('Setting isOpen to true');
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    // }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div 
        className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-700 animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title and description */}
          <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Newsletter
          </h2>
          <p className="text-neutral-300 text-center mb-6 text-sm">
            Subscribe to get special offers and updates directly to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
            >
              Subscribe
            </button>
          </form>

          {/* No thanks button */}
          <button
            onClick={handleClose}
            className="w-full mt-3 text-xs text-neutral-400 hover:text-neutral-300 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
