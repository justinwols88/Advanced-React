import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NewsletterModal from '../common/NewsletterModal';
import { ShoppingBag, Truck, Shield, HeadphonesIcon, RotateCcw } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode
}

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

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-blue-50/30">
      <Header />
      <NewsletterModal />
      <main className="flex-1 pt-[80px] relative z-0">
        <div className="min-h-[calc(100vh-80px-400px)]">
          {children}
        </div>
      </main>
      
      {/* Mission Statement Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-lg shadow-blue-500/50">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Justin Wold's Premium Tech Store
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              Your premier destination for cutting-edge technology and contemporary fashion. We curate the finest products to elevate your tech lifestyle.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-neutral-800/30 border-y border-neutral-700/50 py-8">
        <div className="container mx-auto px-4">
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
      </section>
      
      <Footer />
    </div>
  )
}

export default Layout;