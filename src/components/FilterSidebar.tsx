// src/components/FilterSidebar.tsx
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(['price', 'brand', 'rating']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filters = [
    {
      id: 'price',
      title: 'Price Range',
      content: (
        <div className="space-y-4">
          <div>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              defaultValue="500" 
              className="w-full"
              aria-label="Price range filter"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'brand',
      title: 'Brand',
      content: (
        <div className="space-y-2">
          {['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony'].map(brand => (
            <label key={brand} className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      )
    },
    {
      id: 'rating',
      title: 'Customer Rating',
      content: (
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="text-gray-700">
                {rating}+ stars and above
              </span>
            </label>
          ))}
        </div>
      )
    },
    {
      id: 'availability',
      title: 'Availability',
      content: (
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span className="text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span className="text-gray-700">Pre-order</span>
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter size={20} />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      
      <div className="space-y-6">
        {filters.map(filter => (
          <div key={filter.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <button
              onClick={() => toggleSection(filter.id)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-gray-900">{filter.title}</h3>
              {openSections.includes(filter.id) ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>
            
            {openSections.includes(filter.id) && (
              <div className="mt-4">
                {filter.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Apply Filters
        </button>
        <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;