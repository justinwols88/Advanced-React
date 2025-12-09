import React, { useEffect } from 'react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product.types'
import { cn } from '@/utils/cn'
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('product-grid')

interface ProductGridProps {
  products: Product[]
  viewMode?: 'grid' | 'list'
  className?: string
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  viewMode = 'grid',
  className 
}) => {
  useEffect(() => {
    const span = tracer.startSpan('product-grid.render', {
      attributes: {
        'product.count': products.length,
        'view.mode': viewMode,
      },
    });

    span.end();
  }, [products.length, viewMode]);

  const handleAddToCart = (product: Product) => {
    const span = tracer.startSpan('product-grid.add-to-cart', {
      attributes: {
        'product.id': product.id,
        'product.title': product.title,
        'product.price': product.price,
        'product.category': product.category,
      },
    });

    // Add to cart logic would go here
    span.end();
  };
  if (viewMode === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating?.rate || 0) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.rating?.count || 0})
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}