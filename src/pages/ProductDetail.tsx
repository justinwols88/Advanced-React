import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/common/Loader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/common/Button';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/utils/cn';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(Number(id)),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Go back to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = () => {
    console.log('Wishlist toggle clicked');
    console.log('User:', user);
    console.log('Product:', product);
    console.log('Is in wishlist:', isInWishlist(product.id));
    
    if (!user) {
      console.log('No user, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (isInWishlist(product.id)) {
      console.log('Removing from wishlist');
      removeFromWishlist(product.id);
    } else {
      console.log('Adding to wishlist');
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              fallbackSrc="https://via.placeholder.com/500?text=No+Image"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center mt-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating?.rate || 0) ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <Button
                onClick={handleAddToCart}
                className="py-4 text-lg bg-blue-600 hover:bg-blue-700"
                leftIcon={<ShoppingCart />}
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant={inWishlist ? "secondary" : "outline"}
                className={cn(
                  "px-6",
                  inWishlist && "bg-red-50 border-red-200 hover:bg-red-100"
                )}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("w-6 h-6", inWishlist ? "fill-red-500 text-red-500" : "text-gray-600")} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  addToCart({ ...product, quantity: 1 });
                  navigate('/cart');
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };
export default ProductDetail;