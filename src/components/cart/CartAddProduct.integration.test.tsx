import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types/product.types';

// Integration Test: Cart gets updated when adding products
describe('Cart Integration - Adding Products', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 49.99,
    description: 'A great test product',
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.5,
      count: 120,
    },
  };

  const product2: Product = {
    id: 2,
    title: 'Second Product',
    price: 29.99,
    description: 'Another test product',
    category: 'clothing',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.0, count: 50 },
  };

  // Test component that uses cart functionality
  const CartIntegrationComponent = () => {
    const { items, totalItems, totalPrice, addToCart } = useCart();

    return (
      <div>
        <h2>Cart Status</h2>
        <div data-testid="cart-items-count">{items.length}</div>
        <div data-testid="cart-total-items">{totalItems}</div>
        <div data-testid="cart-total-price">{totalPrice.toFixed(2)}</div>
        
        <button
          data-testid="add-product-1"
          onClick={() => addToCart({ ...mockProduct, quantity: 1 })}
        >
          Add Product 1
        </button>
        
        <button
          data-testid="add-product-2"
          onClick={() => addToCart({ ...product2, quantity: 1 })}
        >
          Add Product 2
        </button>

        {items.map((item) => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            {item.title} - Qty: {item.quantity} - ${item.price.toFixed(2)}
          </div>
        ))}
      </div>
    );
  };

  it('should update cart when adding a product', async () => {
    const user = userEvent.setup();
    render(<CartIntegrationComponent />);

    // Initial state - cart should be empty
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total-price')).toHaveTextContent('0.00');

    // Add product to cart
    const addButton = screen.getByTestId('add-product-1');
    await user.click(addButton);

    // Verify cart was updated
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total-price')).toHaveTextContent('49.99');

    // Verify product appears in cart
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product - Qty: 1 - $49.99');
  });

  it('should update cart when adding multiple quantities of the same product', async () => {
    const user = userEvent.setup();
    render(<CartIntegrationComponent />);

    const addButton = screen.getByTestId('add-product-1');

    // Add product first time
    await user.click(addButton);
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('1');

    // Add same product again
    await user.click(addButton);

    // Verify cart totals reflect both additions
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total-price')).toHaveTextContent('99.98');

    // Should still be 1 unique item in cart with quantity 2
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product - Qty: 2');
  });

  it('should update cart with multiple different products', async () => {
    const user = userEvent.setup();
    render(<CartIntegrationComponent />);

    // Add first product
    await user.click(screen.getByTestId('add-product-1'));
    
    // Add second product
    await user.click(screen.getByTestId('add-product-2'));

    // Verify cart has both products
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total-price')).toHaveTextContent('79.98');

    // Both products should be in cart
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Product');
    expect(screen.getByTestId('cart-item-2')).toHaveTextContent('Second Product');
  });

  it('should calculate correct totals with mixed quantities', async () => {
    const user = userEvent.setup();
    render(<CartIntegrationComponent />);

    // Add product 1 twice (qty: 2, price: $49.99 each = $99.98)
    await user.click(screen.getByTestId('add-product-1'));
    await user.click(screen.getByTestId('add-product-1'));

    // Add product 2 once (qty: 1, price: $29.99 = $29.99)
    await user.click(screen.getByTestId('add-product-2'));

    // Total: 2 unique items, 3 total items, $129.97 total price
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total-price')).toHaveTextContent('129.97');
  });
});
