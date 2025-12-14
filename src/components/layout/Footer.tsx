import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Truck, Shield, HeadphonesIcon, RotateCcw,
  Facebook, Twitter, Instagram, Youtube, 
  Mail, Phone, MapPin, CreditCard
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 lg:gap-12">
          
          {/* Newsletter Section - Left side (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get exclusive deals, product updates, and shopping tips delivered to your inbox!
            </p>
            
            {subscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-medium">✓ Successfully Subscribed!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Shop Links (2 columns) */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="font-semibold text-base text-gray-900 mb-5 pb-2 border-b border-gray-300">
              Shop
            </h3>
            <ul className="space-y-1.5">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-700 hover:text-primary-600 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (2 columns) */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="font-semibold text-base text-gray-900 mb-5 pb-2 border-b border-gray-300">
              Company
            </h3>
            <ul className="space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-700 hover:text-primary-600 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Right side (3 columns) */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg group-hover:shadow-primary-500/50 transition-shadow">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Tech Gear!
                </h2>
              </div>
            </Link>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <a href="mailto:Justin.wold88@gmail.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary-600 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>Justin.wold88@gmail.com</span>
              </a>
              <a href="tel:+12063493679" className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary-600 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (206) 349-3679</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>13421 24th Ave S Apt 4, Seattle, WA 98168</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gradient-to-br hover:from-primary-600 hover:to-secondary-600 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-700 hover:text-white"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-300 bg-gray-100 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-4 text-gray-700">
              <span className="text-xs">Secure payments with:</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-8 h-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">Visa</span>
                <span className="text-xs font-medium text-gray-600">•</span>
                <span className="text-xs font-medium text-gray-600">Mastercard</span>
                <span className="text-xs font-medium text-gray-600">•</span>
                <span className="text-xs font-medium text-gray-600">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-gray-700 text-xs text-center">
              The Technology Store was Handcrafted with care by <span className="text-primary-600 font-medium">Justin Wold</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-700">
              <Link to="/privacy" className="hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/terms" className="hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/cookies" className="hover:text-primary-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Data
const features = [
  {
    icon: <Truck className="w-6 h-6 text-blue-400" />,
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: 'Secure Payment',
    description: '100% protected transactions'
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-purple-400" />,
    title: '30-Day Returns',
    description: 'Easy return policy'
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6 text-orange-400" />,
    title: '24/7 Support',
    description: 'Dedicated customer service'
  }
];

const socialLinks = [
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/profile.php?id=61571025256823' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com' }
];

const shopLinks = [
  { name: 'All Products', href: '/' },
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Jewelry', href: '/category/jewelery' },
  { name: "Men's Clothing", href: "/category/men's clothing" },
  { name: "Women's Clothing", href: "/category/women's clothing" }
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Career', href: '/career' }
];

export default Footer;