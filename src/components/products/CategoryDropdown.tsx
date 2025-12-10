import React from 'react';
import { useCategories } from '@/hooks/useProducts';
import { ChevronDown } from 'lucide-react';

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading categories...</div>;
  }

  return (
    <div className="relative inline-block">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category
      </label>
      <div className="relative">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 bg-white hover:border-gray-400 transition-colors cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};