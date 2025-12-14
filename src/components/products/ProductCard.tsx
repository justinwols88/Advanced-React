import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Product } from '@/types/product.types';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const dispatch = useDispatch();
  
  const isLiked = isInWishlist(product.id);

  const rating = product.rating?.rate || 0;
  const ratingCount = product.rating?.count || 0;

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div
      data-testid="product-card"
      className={cn(
        "group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick Actions Overlay */}
      <div className={cn(
        "absolute top-4 right-4 z-10 flex flex-col space-y-2 transition-all duration-300",
        isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      )}>
        <button
          onClick={handleWishlistToggle}
          className={cn(
            "w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors",
            isLiked 
              ? "text-red-500 hover:text-red-600" 
              : "text-neutral-400 hover:text-red-500"
          )}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-neutral-400 hover:text-primary-500 transition-colors"
          aria-label="Quick view"
        >
          <Eye className="w-5 h-5" />
        </Link>
      </div>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-3">
          <Link to={`/category/${product.category}`}>
            <span className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
              {product.category}
            </span>
          </Link>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(rating) 
                    ? "text-accent-500 fill-current" 
                    : "text-neutral-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-500">
            {rating.toFixed(1)} ({ratingCount})
          </span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.price > 100 && (
              <span className="ml-2 px-2 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded">
                Free Shipping
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
              isHovered
                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                : "bg-neutral-100 hover:bg-neutral-200"
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};