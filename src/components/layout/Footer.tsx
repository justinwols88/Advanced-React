import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Truck, Shield, HeadphonesIcon, RotateCcw,
  Facebook, Twitter, Instagram, Youtube, 
  Mail, Phone, MapPin, CreditCard
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white mt-auto">
      {/* Features Bar */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">{feature.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Section - Spans 4 columns */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StyleCart
                </h2>
                <p className="text-xs text-neutral-400">Tech & Fashion Store</p>
              </div>
            </Link>
            
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 max-w-sm">
              Your premier destination for cutting-edge technology and contemporary fashion. 
              We curate the finest products to elevate your lifestyle.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:support@stylecart.com" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>support@stylecart.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, Tech City, TC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 columns each */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="font-semibold text-base text-white mb-5 pb-2 border-b border-neutral-700">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-400 hover:text-blue-400 hover:translate-x-1 inline-block transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-base text-white mb-5 pb-2 border-b border-neutral-700">
              Newsletter
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-neutral-700/50 bg-neutral-800/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="text-xs">Secure payments with:</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-8 h-5 text-neutral-500" />
                <span className="text-xs font-medium text-neutral-500">Visa</span>
                <span className="text-xs font-medium text-neutral-500">•</span>
                <span className="text-xs font-medium text-neutral-500">Mastercard</span>
                <span className="text-xs font-medium text-neutral-500">•</span>
                <span className="text-xs font-medium text-neutral-500">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-xs text-center md:text-left">
              © 2025 StyleCart. Handcrafted with care by <span className="text-blue-400 font-medium">Justin Wold</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-neutral-400">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-neutral-600">•</span>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-neutral-600">•</span>
              <Link to="/cookies" className="hover:text-blue-400 transition-colors">
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
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://www.twitter.com' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://www.youtube.com' }
];

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'All Products', href: '/' },
      { name: 'Electronics', href: '/category/electronics' },
      { name: 'Jewelry', href: '/category/jewelery' },
      { name: "Men's Clothing", href: "/category/men's clothing" },
      { name: "Women's Clothing", href: "/category/women's clothing" }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/' },
      { name: 'Contact', href: '/' },
      { name: 'Careers', href: '/' },
      { name: 'Blog', href: '/' }
    ]
  },
  {
    title: 'Customer Service',
    links: [
      { name: 'Help Center', href: '/' },
      { name: 'Track Order', href: '/' },
      { name: 'Shipping Info', href: '/' },
      { name: 'Returns', href: '/' }
    ]
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'Shopping Cart', href: '/cart' },
      { name: 'Wishlist', href: '/' },
      { name: 'Compare', href: '/' },
      { name: 'My Account', href: '/' }
    ]
  }
];

export default Footer;