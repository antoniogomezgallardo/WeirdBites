import { render, screen, act, waitFor } from '@testing-library/react';
import { ProductCard } from '../product-card';

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
        expect(image).toHaveAttribute('src', '/images/placeholder.jpg');
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
  });
});
