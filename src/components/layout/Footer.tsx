import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, CreditCard, Truck, Shield, 
  Facebook, Twitter, Instagram, Youtube, 
  Mail, Phone, MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      {/* Top Features */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-8">
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">Justin Wold's</h2>
                <p className="text-neutral-400 text-sm">Premium Tech Experience</p>
              </div>
            </Link>
            <p className="text-neutral-400 mb-6">
              Discover amazing products with premium quality. We're dedicated to providing the best customer experience and top-notch service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:fleax-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © 2025 This E-Commerce Store, was hand crafted with care and detail by Justin Wold.
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
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
    icon: <Truck className="w-6 h-6 text-primary-400" />,
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary-400" />,
    title: 'Secure Payment',
    description: '100% secure transactions'
  },
  {
    icon: <Shield className="w-6 h-6 text-primary-400" />,
    title: '30-Day Returns',
    description: 'Easy return policy'
  },
  {
    icon: <Phone className="w-6 h-6 text-primary-400" />,
    title: '24/7 Support',
    description: 'Dedicated customer service'
  }
];

const socialLinks = [
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: '#' }
];

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'All Products', href: '/products' },
      { name: 'New Arrivals', href: '/new' },
      { name: 'Best Sellers', href: '/bestsellers' },
      { name: 'Sale', href: '/sale' },
      { name: 'Gift Cards', href: '/gift-cards' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Affiliates', href: '/affiliates' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' }
    ]
  }
];

export default Footer;