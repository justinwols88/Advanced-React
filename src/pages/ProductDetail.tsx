import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import { Loader } from '@/components/common/Loader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/common/Button';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="relative h-96">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
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

          {/* Add to Cart Button */}
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full py-4 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart
            </Button>
            
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