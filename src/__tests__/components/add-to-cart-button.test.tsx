import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

// Mock Sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AddToCartButton', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderWithCart = (component: React.ReactElement) => {
    return render(<CartProvider>{component}</CartProvider>);
  };

  describe('rendering', () => {
    it('should render button with default text', () => {
      renderWithCart(<AddToCartButton productId="product-1" />);

      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('should render button with custom text', () => {
      renderWithCart(<AddToCartButton productId="product-1" label="Buy Now" />);

      expect(screen.getByRole('button', { name: /buy now/i })).toBeInTheDocument();
    });

    it('should have shopping cart icon', () => {
      renderWithCart(<AddToCartButton productId="product-1" />);

      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('adding to cart', () => {
    it('should add product to cart when clicked', async () => {
      const TestComponent = () => {
        const { items } = useCart();
        return (
          <div>
            <AddToCartButton productId="product-1" />
            <div data-testid="cart-count">{items.length}</div>
          </div>
        );
      };

      renderWithCart(<TestComponent />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
      });
    });

    it('should increment quantity when clicking multiple times', async () => {
      const TestComponent = () => {
        const { items } = useCart();
        const quantity = items[0]?.quantity || 0;
        return (
          <div>
            <AddToCartButton productId="product-1" />
            <div data-testid="cart-quantity">{quantity}</div>
          </div>
        );
      };

      renderWithCart(<TestComponent />);

      const button = screen.getByRole('button', { name: /add to cart/i });

      // Click twice
      fireEvent.click(button);
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('cart-quantity')).toHaveTextContent('2');
      });
    });

    it('should show success toast when item added', async () => {
      renderWithCart(<AddToCartButton productId="product-1" productName="Weird Chips" />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Added Weird Chips to cart');
      });
    });

    it('should show generic success toast when no product name', async () => {
      renderWithCart(<AddToCartButton productId="product-1" />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Added to cart');
      });
    });
  });

  describe('disabled state', () => {
    it('should disable button when disabled prop is true', () => {
      renderWithCart(<AddToCartButton productId="product-1" disabled />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not add to cart when disabled', () => {
      const TestComponent = () => {
        const { items } = useCart();
        return (
          <div>
            <AddToCartButton productId="product-1" disabled />
            <div data-testid="cart-count">{items.length}</div>
          </div>
        );
      };

      renderWithCart(<TestComponent />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });

    it('should not show toast when disabled', () => {
      renderWithCart(<AddToCartButton productId="product-1" disabled />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(toast.success).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have accessible name', () => {
      renderWithCart(<AddToCartButton productId="product-1" />);

      const button = screen.getByRole('button', { name: /add to cart/i });
      expect(button).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      const TestComponent = () => {
        const { items } = useCart();
        return (
          <div>
            <AddToCartButton productId="product-1" />
            <div data-testid="cart-count">{items.length}</div>
          </div>
        );
      };

      renderWithCart(<TestComponent />);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      // Click the button (keyboard users can activate buttons via Enter/Space)
      fireEvent.click(button);

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    });

    it('should have aria-label when productName provided', () => {
      renderWithCart(<AddToCartButton productId="product-1" productName="Weird Chips" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Add Weird Chips to cart');
    });
  });

  describe('styling', () => {
    it('should apply custom className', () => {
      renderWithCart(<AddToCartButton productId="product-1" className="custom-class" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should have default button styles', () => {
      renderWithCart(<AddToCartButton productId="product-1" />);

      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-green-600');
    });
  });
});
