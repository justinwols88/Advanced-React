// src/components/Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <Link
              to={item.href}
              className="flex items-center text-gray-500 hover:text-gray-700"
              aria-label="Home"
              title="Go to home page"
            >
              <Home size={16} />
            </Link>
          ) : (
            <Link
              to={item.href}
              className={`${
                index === items.length - 1
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          )}
          
          {index < items.length - 1 && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;