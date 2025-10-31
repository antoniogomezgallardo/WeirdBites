/**
 * Unit Tests for StockBadge Component
 *
 * TDD RED Phase: Writing failing tests first
 * Tests visual display and accessibility of stock status badge
 */

import { render, screen } from '@testing-library/react';
import { StockBadge } from '../stock-badge';

describe('StockBadge Component', () => {
  describe('In Stock State', () => {
    it('should render in-stock badge with correct text', () => {
      render(<StockBadge stock={100} />);
      expect(screen.getByText('100 in stock')).toBeInTheDocument();
    });

    it('should apply green styling for in-stock items', () => {
      render(<StockBadge stock={50} />);
      const badge = screen.getByText('50 in stock');
      expect(badge).toHaveClass('bg-green-100');
      expect(badge).toHaveClass('text-green-800');
    });
  });

  describe('Low Stock State', () => {
    it('should render low-stock badge with correct text', () => {
      render(<StockBadge stock={3} />);
      expect(screen.getByText('Only 3 left')).toBeInTheDocument();
    });

    it('should apply yellow styling for low-stock items', () => {
      render(<StockBadge stock={5} />);
      const badge = screen.getByText('Only 5 left');
      expect(badge).toHaveClass('bg-yellow-100');
      expect(badge).toHaveClass('text-yellow-800');
    });
  });

  describe('Out of Stock State', () => {
    it('should render out-of-stock badge with correct text', () => {
      render(<StockBadge stock={0} />);
      expect(screen.getByText('Out of stock')).toBeInTheDocument();
    });

    it('should apply red styling for out-of-stock items', () => {
      render(<StockBadge stock={0} />);
      const badge = screen.getByText('Out of stock');
      expect(badge).toHaveClass('bg-red-100');
      expect(badge).toHaveClass('text-red-800');
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate ARIA role for status announcement', () => {
      const { container } = render(<StockBadge stock={10} />);
      const badge = container.querySelector('[role="status"]');
      expect(badge).toBeInTheDocument();
    });

    it('should include aria-live for screen reader updates', () => {
      const { container } = render(<StockBadge stock={2} />);
      const badge = container.querySelector('[aria-live="polite"]');
      expect(badge).toBeInTheDocument();
    });
  });
});
