/**
 * Unit Tests for CategoryFilter Component
 *
 * Tests category filtering functionality including:
 * - Rendering all category buttons with counts
 * - Active category highlighting
 * - URL query param navigation on click
 * - "All Products" button to clear filters
 * - Accessibility (ARIA attributes, keyboard navigation)
 *
 * Following TDD: Write tests first, then implement component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryFilter } from '../category-filter';

// Mock Next.js router
const mockPush = jest.fn();
const mockPathname = '/';
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

describe('CategoryFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete('category');
  });

  describe('Rendering', () => {
    it('should render all category buttons with product counts', () => {
      const categories = [
        { name: 'Spicy', count: 5 },
        { name: 'Sweet', count: 3 },
        { name: 'Savory', count: 7 },
      ];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      // All Products button
      expect(screen.getByRole('button', { name: /all products/i })).toBeInTheDocument();

      // Category buttons with counts
      expect(screen.getByRole('button', { name: /spicy.*5/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sweet.*3/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /savory.*7/i })).toBeInTheDocument();
    });

    it('should render empty state when no categories provided', () => {
      render(<CategoryFilter categories={[]} selectedCategory={null} />);

      // Should still show "All Products" button
      expect(screen.getByRole('button', { name: /all products/i })).toBeInTheDocument();

      // Should not show any category buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1); // Only "All Products"
    });

    it('should highlight selected category', () => {
      const categories = [
        { name: 'Spicy', count: 5 },
        { name: 'Sweet', count: 3 },
      ];

      render(<CategoryFilter categories={categories} selectedCategory="Spicy" />);

      const spicyButton = screen.getByRole('button', { name: /spicy.*5/i });
      const sweetButton = screen.getByRole('button', { name: /sweet.*3/i });

      // Selected category should have active styling
      expect(spicyButton).toHaveClass('bg-green-600');
      expect(spicyButton).toHaveClass('text-white');

      // Unselected category should have default styling
      expect(sweetButton).toHaveClass('bg-white');
      expect(sweetButton).toHaveClass('text-gray-700');
    });

    it('should highlight "All Products" when no category selected', () => {
      const categories = [{ name: 'Spicy', count: 5 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const allProductsButton = screen.getByRole('button', { name: /all products/i });

      // "All Products" should have active styling
      expect(allProductsButton).toHaveClass('bg-green-600');
      expect(allProductsButton).toHaveClass('text-white');
    });
  });

  describe('User Interactions', () => {
    it('should navigate with category query param when category clicked', async () => {
      const user = userEvent.setup();
      const categories = [{ name: 'Spicy', count: 5 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const spicyButton = screen.getByRole('button', { name: /spicy.*5/i });
      await user.click(spicyButton);

      // Should navigate to /?category=Spicy
      expect(mockPush).toHaveBeenCalledWith('/?category=Spicy');
    });

    it('should clear category filter when "All Products" clicked', async () => {
      const user = userEvent.setup();
      const categories = [{ name: 'Spicy', count: 5 }];

      // Start with category selected
      render(<CategoryFilter categories={categories} selectedCategory="Spicy" />);

      const allProductsButton = screen.getByRole('button', { name: /all products/i });
      await user.click(allProductsButton);

      // Should navigate to / (no query params)
      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should handle keyboard navigation (Enter key)', async () => {
      const user = userEvent.setup();
      const categories = [{ name: 'Sweet', count: 3 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const sweetButton = screen.getByRole('button', { name: /sweet.*3/i });
      sweetButton.focus();
      await user.keyboard('{Enter}');

      // Should navigate to /?category=Sweet
      expect(mockPush).toHaveBeenCalledWith('/?category=Sweet');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const categories = [{ name: 'Spicy', count: 5 }];

      render(<CategoryFilter categories={categories} selectedCategory="Spicy" />);

      const spicyButton = screen.getByRole('button', { name: /spicy.*5/i });

      // Should have aria-pressed for toggle button
      expect(spicyButton).toHaveAttribute('aria-pressed', 'true');

      const allProductsButton = screen.getByRole('button', { name: /all products/i });
      expect(allProductsButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should be keyboard accessible', () => {
      const categories = [
        { name: 'Spicy', count: 5 },
        { name: 'Sweet', count: 3 },
      ];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const allButtons = screen.getAllByRole('button');

      // All buttons should be focusable
      allButtons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('should have descriptive aria-label for screen readers', () => {
      const categories = [{ name: 'Spicy', count: 5 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const spicyButton = screen.getByRole('button', { name: /spicy.*5/i });

      // Should include count in accessible name
      expect(spicyButton).toHaveAccessibleName(/5 products/i);
    });
  });

  describe('Edge Cases', () => {
    it('should handle category names with special characters', () => {
      const categories = [{ name: 'Sweet & Sour', count: 2 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const button = screen.getByRole('button', { name: /sweet & sour.*2/i });
      expect(button).toBeInTheDocument();
    });

    it('should handle zero product count', () => {
      const categories = [{ name: 'Spicy', count: 0 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      const spicyButton = screen.getByRole('button', { name: /spicy.*0/i });
      expect(spicyButton).toBeInTheDocument();
      // Button should still be clickable even with 0 products
      expect(spicyButton).not.toBeDisabled();
    });

    it('should handle large product counts', () => {
      const categories = [{ name: 'International', count: 1234 }];

      render(<CategoryFilter categories={categories} selectedCategory={null} />);

      expect(screen.getByRole('button', { name: /international.*1234/i })).toBeInTheDocument();
    });
  });
});
