import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ArrowRight, Star, Truck, Shield, Clock, Award } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryDropdown } from '@/components/products/CategoryDropdown';

const features = [
  {
    name: 'Free Shipping',
    description: 'On orders over $50',
    icon: <Truck className="w-6 h-6 text-warm-600" />,
  },
  {
    name: 'Secure Payment',
    description: '100% protected',
    icon: <Shield className="w-6 h-6 text-warm-600" />,
  },
  {
    name: 'Fast Delivery',
    description: '2-3 business days',
    icon: <Clock className="w-6 h-6 text-warm-600" />,
  },
  {
    name: 'Quality Guarantee',
    description: 'Certified products',
    icon: <Award className="w-6 h-6 text-warm-600" />,
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { data: products = [], isLoading } = useProducts(selectedCategory || undefined);
  const { data: categories = [] } = useCategories();

  // Filter products by search query if present
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Show only 4 products when no category or search is selected, show all when filtered
  const displayProducts = selectedCategory || searchQuery ? filteredProducts : filteredProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-earth-50">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-r from-warm-500/10 to-sky-500/10">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-warm-800 mb-6">
                Welcome to
                <span className="block text-sky-700">the technology store</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                Discover handpicked Technology, Wear, and fashion accessories that make you feel like you have the tech advantage. Technology crafted with care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/category/electronics"
                  className="inline-flex items-center px-6 py-3 bg-warm-500 text-white font-medium rounded-lg hover:bg-warm-600 transition-colors"
                >
                  Shop Electronics
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/category/jewelery"
                  className="inline-flex items-center px-6 py-3 border-2 border-warm-500 text-warm-600 font-medium rounded-lg hover:bg-warm-50 transition-colors"
                >
                  Browse Collection
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-card">
                <img
                  src="/images/1.jpg"
                  alt="Tech for sale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-warm-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-warm-800 mb-2">
                {searchQuery 
                  ? 'Search Results' 
                  : selectedCategory 
                    ? 'Filtered Products' 
                    : 'Featured Products'}
              </h2>
              <p className="text-neutral-600">
                {searchQuery 
                  ? `Showing results for "${searchQuery}" (${displayProducts.length} found)` 
                  : selectedCategory 
                    ? `Showing products in ${selectedCategory}` 
                    : 'Curated picks just for you'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <CategoryDropdown 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="text-warm-600 hover:text-warm-700 font-medium flex items-center whitespace-nowrap"
                >
                  View all
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};


export default HomePage;