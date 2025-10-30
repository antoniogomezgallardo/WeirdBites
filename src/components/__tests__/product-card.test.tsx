import { render, screen, act, waitFor } from '@testing-library/react';
import { ProductCard } from '../product-card';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} data-nextjs-image="true" />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Durian Chips',
    description: 'Crispy chips made from the king of fruits',
    price: 12.99,
    imageUrl: '/images/products/durian-chips.jpg',
    category: 'Snacks',
    origin: 'Thailand',
    stock: 50,
  };

  describe('Happy Path', () => {
    it('should render product name', () => {
      render(<ProductCard product={mockProduct} />);
      expect(screen.getByText('Durian Chips')).toBeInTheDocument();
    });

    it('should render product price formatted as currency', () => {
      render(<ProductCard product={mockProduct} />);
      expect(screen.getByText('$12.99')).toBeInTheDocument();
    });

    it('should render product image with alt text', () => {
      render(<ProductCard product={mockProduct} />);
      const image = screen.getByAltText('Durian Chips');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/products/durian-chips.jpg');
    });

    it('should use Next.js Image component for optimization', () => {
      const { container } = render(<ProductCard product={mockProduct} />);
      const image = screen.getByAltText('Durian Chips');

      // Verify Next.js Image is being used
      expect(image).toHaveAttribute('data-nextjs-image', 'true');

      // Verify image container has proper data attribute
      expect(container.querySelector('[data-image-container="true"]')).toBeInTheDocument();
    });

    it('should apply correct image sizing and lazy loading', () => {
      render(<ProductCard product={mockProduct} />);
      const image = screen.getByAltText('Durian Chips');

      // Verify image has sizes attribute for responsive loading
      expect(image).toHaveAttribute('sizes');
    });

    it('should truncate long product names with ellipsis', () => {
      const longNameProduct = {
        ...mockProduct,
        name: 'This is an extremely long product name that should be truncated with an ellipsis to prevent layout issues on small screens',
      };

      const { container } = render(<ProductCard product={longNameProduct} />);
      const heading = container.querySelector('h2');

      // Check if heading has truncation CSS classes
      expect(heading).toHaveClass('line-clamp-2');
    });

    it('should link to product detail page', () => {
      const { container } = render(<ProductCard product={mockProduct} />);
      const link = container.querySelector('a');

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/products/1');
    });

    it('should have data-testid attributes for E2E testing', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByTestId('product-card')).toBeInTheDocument();
      expect(screen.getByTestId('product-name')).toBeInTheDocument();
      expect(screen.getByTestId('product-price')).toBeInTheDocument();
    });
  });

  describe('Error Scenarios', () => {
    it('should show placeholder when image fails to load', async () => {
      render(<ProductCard product={mockProduct} />);
      const image = screen.getByAltText('Durian Chips') as HTMLImageElement;

      // Simulate image load error wrapped in act
      act(() => {
        image.dispatchEvent(new Event('error'));
      });

      // Wait for state update and verify placeholder
      await waitFor(() => {
        expect(image).toHaveAttribute('src', '/images/placeholder.png');
      });
    });

    it('should handle missing description gracefully', () => {
      const productWithoutDescription = {
        ...mockProduct,
        description: '',
      };
      render(<ProductCard product={productWithoutDescription} />);

      // Should still render card without errors
      expect(screen.getByText('Durian Chips')).toBeInTheDocument();
    });

    it('should handle invalid price (null/undefined)', () => {
      const productWithInvalidPrice = {
        ...mockProduct,
        price: null as unknown as number,
      };

      render(<ProductCard product={productWithInvalidPrice} />);

      // Should show fallback price or "Price unavailable"
      expect(screen.getByText(/unavailable|N\/A/i)).toBeInTheDocument();
    });

    it('should handle very long descriptions (>200 chars)', () => {
      const longDescProduct = {
        ...mockProduct,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      };

      const { container } = render(<ProductCard product={longDescProduct} />);
      const description = container.querySelector('p.text-sm');

      // Should truncate with line-clamp
      expect(description).toHaveClass('line-clamp-3');
    });
  });
});
