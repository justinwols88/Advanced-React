import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/product.types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test product description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getAllByText('electronics')[0]).toBeInTheDocument();
  });

  it('displays product image', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('shows rating information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/4\.5/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('navigates to product detail on click', () => {
    render(<ProductCard product={mockProduct} />);

    const productLinks = screen.getAllByRole('link');
    const productDetailLink = productLinks.find(link => 
      link.getAttribute('href') === '/product/1'
    );
    expect(productDetailLink).toHaveAttribute('href', '/product/1');
  });
});
