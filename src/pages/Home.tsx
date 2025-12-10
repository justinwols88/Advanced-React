import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ArrowRight, Star, Truck, Shield, Clock, Award } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';

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
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const featuredProducts = products.slice(0, 4);

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
                  to="/category/men's clothing"
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
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-warm-800 mb-2">
                Featured Products
              </h2>
              <p className="text-neutral-600">Curated picks just for you</p>
            </div>
            <Link
              to="/products"
              className="text-warm-600 hover:text-warm-700 font-medium flex items-center"
            >
              View all
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-warm-800 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-warm-100 to-sky-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-warm-800 capitalize">
                    {category.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


export default HomePage;