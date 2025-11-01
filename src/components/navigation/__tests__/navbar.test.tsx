import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Navbar } from '../navbar';
import * as CartContext from '@/contexts/cart-context';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock CartContext
jest.mock('@/contexts/cart-context', () => ({
  useCart: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockUseCart = CartContext.useCart as jest.MockedFunction<typeof CartContext.useCart>;

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    // Default: empty cart
    mockUseCart.mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      totalQuantity: 0,
    });
  });

  describe('Happy Path - Desktop Navigation', () => {
    it('should render logo', () => {
      render(<Navbar />);
      expect(screen.getByText('WeirdBites')).toBeInTheDocument();
    });

    it('should render "Products" link', () => {
      render(<Navbar />);
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('should render "Cart" icon with count badge', () => {
      mockUseCart.mockReturnValue({
        items: [
          { productId: '1', quantity: 2, addedAt: new Date() },
          { productId: '2', quantity: 1, addedAt: new Date() },
        ],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 3,
      });
      render(<Navbar />);
      // Cart link should exist with proper aria-label
      const cartLink = screen.getByRole('link', { name: /cart.*3 items/i });
      expect(cartLink).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should render "Account" link', () => {
      render(<Navbar />);
      expect(screen.getByText('Account')).toBeInTheDocument();
    });

    it('should highlight active link based on current pathname', () => {
      (usePathname as jest.Mock).mockReturnValue('/products');
      render(<Navbar />);

      const productsLink = screen.getByText('Products').closest('a');
      const homeLink = screen.getByText('WeirdBites').closest('a');

      // Products should have active styling (contains border-b-2 and border-gray-900)
      expect(productsLink?.className).toContain('border-b-2');
      expect(productsLink?.className).toContain('border-gray-900');
      // Home should not have border-b-2 (active indicator)
      expect(homeLink?.className).not.toContain('border-b-2');
    });

    it('should display cart count correctly for 0 items', () => {
      // Default mock has empty cart (items: [])
      render(<Navbar />);
      expect(screen.queryByText('0')).not.toBeInTheDocument(); // Don't show badge for 0
    });

    it('should display cart count correctly for 1 item', () => {
      mockUseCart.mockReturnValue({
        items: [{ productId: '1', quantity: 1, addedAt: new Date() }],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 1,
      });
      render(<Navbar />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should display cart count correctly for 10 items', () => {
      mockUseCart.mockReturnValue({
        items: [{ productId: '1', quantity: 10, addedAt: new Date() }],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 10,
      });
      render(<Navbar />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should display cart count as "99+" for 100+ items', () => {
      mockUseCart.mockReturnValue({
        items: [{ productId: '1', quantity: 150, addedAt: new Date() }],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 150,
      });
      render(<Navbar />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      // Mock viewport width for mobile
      global.innerWidth = 500;
    });

    it('should render hamburger menu button on mobile', () => {
      render(<Navbar />);
      const hamburgerButton = screen.getByLabelText(/open menu/i);
      expect(hamburgerButton).toBeInTheDocument();
    });

    it('should open mobile drawer when hamburger is clicked', () => {
      render(<Navbar />);
      const hamburgerButton = screen.getByLabelText(/open menu/i);

      // Drawer should not be visible initially
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Click hamburger
      fireEvent.click(hamburgerButton);

      // Drawer should now be visible
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close mobile drawer when link is clicked', () => {
      render(<Navbar />);
      const hamburgerButton = screen.getByLabelText(/open menu/i);

      // Open drawer
      fireEvent.click(hamburgerButton);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Click on a link inside drawer (there are 2 "Products" links - desktop + mobile)
      const drawer = screen.getByRole('dialog');
      const productsLinkInDrawer = drawer.querySelector('a[href="/products"]');
      if (productsLinkInDrawer) {
        fireEvent.click(productsLinkInDrawer);
      }

      // Drawer should close
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for cart icon', () => {
      mockUseCart.mockReturnValue({
        items: [{ productId: '1', quantity: 5, addedAt: new Date() }],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 5,
      });
      render(<Navbar />);
      expect(screen.getByLabelText(/cart.*5 items/i)).toBeInTheDocument();
    });

    it('should support keyboard navigation with Tab key', () => {
      mockUseCart.mockReturnValue({
        items: [{ productId: '1', quantity: 1, addedAt: new Date() }],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
        totalQuantity: 1,
      });
      render(<Navbar />);

      const logo = screen.getByText('WeirdBites').closest('a');
      const productsLink = screen.getByText('Products').closest('a');
      const cartLink = screen.getByRole('link', { name: /cart.*1 item/i });
      const accountLink = screen.getByText('Account').closest('a');

      // All interactive elements should be focusable (have href attribute)
      expect(logo).toHaveAttribute('href', '/');
      expect(productsLink).toHaveAttribute('href', '/products');
      expect(cartLink).toHaveAttribute('href', '/cart');
      expect(accountLink).toHaveAttribute('href', '/account');
    });
  });

  describe('Styling & Positioning', () => {
    it('should have sticky positioning applied', () => {
      const { container } = render(<Navbar />);
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('sticky');
    });
  });
});
