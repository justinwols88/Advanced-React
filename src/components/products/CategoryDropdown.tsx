import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

const CategoryPage = () => {
  const { category } = useParams();
  const { data: products = [] } = useProducts(category);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-warm-800 mb-8 capitalize">
        {category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h3 className="font-semibold mb-2">{product.title}</h3>
            <p className="text-warm-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;