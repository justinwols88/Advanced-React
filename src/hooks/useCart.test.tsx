import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { useCart } from '@/hooks/useCart';

describe('useCart hook', () => {
  const TestComponent = () => {
    const { items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

    return (
      <div>
        <div data-testid="total-items">{totalItems}</div>
        <div data-testid="total-price">{totalPrice.toFixed(2)}</div>
        <div data-testid="items-count">{items.length}</div>
        <button onClick={() => addToCart({
          id: 1,
          title: 'Test Product',
          price: 50,
          description: 'Test',
          category: 'test',
          image: 'test.jpg',
          rating: { rate: 5, count: 10 },
          quantity: 1
        })}>
          Add Item
        </button>
        <button onClick={() => removeFromCart(1)}>Remove Item</button>
        <button onClick={() => updateQuantity(1, 3)}>Update Quantity</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    );
  };

  it('initializes with empty cart', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0.00');
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('adds item to cart', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const addButton = screen.getByText('Add Item');
    await user.click(addButton);

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('50.00');
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
  });

  it('removes item from cart', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const addButton = screen.getByText('Add Item');
    await user.click(addButton);

    const removeButton = screen.getByText('Remove Item');
    await user.click(removeButton);

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0.00');
  });

  it('updates item quantity', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const addButton = screen.getByText('Add Item');
    await user.click(addButton);

    const updateButton = screen.getByText('Update Quantity');
    await user.click(updateButton);

    expect(screen.getByTestId('total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('total-price')).toHaveTextContent('150.00');
  });

  it('clears cart', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const addButton = screen.getByText('Add Item');
    await user.click(addButton);

    const clearButton = screen.getByText('Clear Cart');
    await user.click(clearButton);

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });
});
