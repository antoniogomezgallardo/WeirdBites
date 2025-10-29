import { render, screen } from '@testing-library/react';
import { LoadingSkeleton } from '../loading-skeleton';

describe('LoadingSkeleton', () => {
  describe('Happy Path', () => {
    it('renders skeleton with correct number of cards', () => {
      render(<LoadingSkeleton count={8} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      expect(skeletonCards).toHaveLength(8);
    });

    it('shows shimmer animation', () => {
      render(<LoadingSkeleton count={4} />);

      const skeletonCards = screen.getAllByTestId('skeleton-card');
      skeletonCards.forEach(card => {
        // Check for animation class
        expect(card).toHaveClass('animate-pulse');
      });
    });

    it('has accessible loading label', () => {
      render(<LoadingSkeleton count={12} />);

      // Should have aria-label or role for screen readers
      const loadingElement = screen.getByRole('status');
      expect(loadingElement).toBeInTheDocument();
      expect(loadingElement).toHaveAttribute('aria-live', 'polite');
      expect(loadingElement).toHaveAttribute('aria-label', 'Loading products');
    });
  });
});
