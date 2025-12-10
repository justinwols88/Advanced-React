// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/Breadcrumb';
import { getProductsByCategory } from '@/services/api';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sort') || 'featured';
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: ['category', categoryId, page, sortBy],
    queryFn: () => getProductsByCategory(categoryId!, page, sortBy),
    enabled: !!categoryId,
  });

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading category: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const category = categoryData?.category;
  const products = categoryData?.products || [];
  const totalPages = categoryData?.totalPages || 1;

  console.log('CategoryPage render:', { categoryId, categoryData, products: products.length });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: category?.name || 'Category', href: '#' }
        ]} 
      />
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category?.name || 'Category'}
        </h1>
        {category?.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
        <p className="text-gray-500 mt-2">
          {categoryData?.totalProducts || 0} products
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" aria-label="Toggle filters">
                <Filter size={18} />
                <span>Filters</span>
              </button>
              
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white pr-8 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" 
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="List view"
                title="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <ProductGrid 
              products={products} 
              viewMode={viewMode}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination 
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('page', newPage.toString());
                  setSearchParams(params);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;