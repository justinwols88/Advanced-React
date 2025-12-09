import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[length:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 text-sm uppercase tracking-wider text-charcoal-600">
                <span>Est. 2023</span>
                <div className="w-1 h-1 bg-charcoal-300 rounded-full"></div>
                <span>New York</span>
              </div>
              
              <h1 className="text-5xl md:text-display-2xl font-serif font-light leading-none text-charcoal-900">
                Objects of<br />
                <span className="italic">Exceptional</span>
                <br />
                Character
              </h1>
              
              <p className="text-xl text-charcoal-600 font-light max-w-lg leading-relaxed">
                Curated collection of design, art, and architecture pieces for those who appreciate refined aesthetics and craftsmanship.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/collection"
                className="group inline-flex items-center justify-center px-8 py-4 bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Explore Collection
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/journal"
                className="inline-flex items-center justify-center px-8 py-4 border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-50 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Read Journal
              </Link>
            </div>
          </div>
          
          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className={`aspect-square bg-taupe-100 animate-float ${styles.floatDelay0}`}></div>
              <div className={`aspect-[4/3] bg-taupe-200 animate-float ${styles.floatDelay2}`}></div>
            </div>
            <div className="space-y-4 pt-12">
              <div className={`aspect-[3/4] bg-taupe-300 animate-float ${styles.floatDelay1}`}></div>
              <div className={`aspect-square bg-taupe-400 animate-float ${styles.floatDelay3}`}></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="text-xs uppercase tracking-wider text-charcoal-400 animate-pulse">
            Scroll
          </div>
          <div className="w-px h-16 bg-charcoal-200 mx-auto mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;