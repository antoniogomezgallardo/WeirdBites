/**
 * Unit Tests for AddToCartButton Component
 *
 * TDD RED Phase: Writing failing tests first
 * Tests button states, click handling, and accessibility
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCartButton } from '../add-to-cart-button';

describe('AddToCartButton Component', () => {
  describe('Disabled State (Out of Stock)', () => {
    it('should be disabled when stock is 0', () => {
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should show "Out of stock" text when stock is 0', () => {
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    });
  });

  describe('Disabled State (Cart Not Implemented)', () => {
    it('should be disabled when cart feature is not enabled', () => {
      render(<AddToCartButton stock={10} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should show "Coming Soon" text when cart feature is not enabled', () => {
      render(<AddToCartButton stock={10} productId="test-id" productName="Test Product" />);
      expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('should apply disabled styling when out of stock', () => {
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('should apply disabled styling when cart not enabled', () => {
      render(<AddToCartButton stock={10} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label describing the action', () => {
      render(<AddToCartButton stock={10} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Test Product'));
    });

    it('should have aria-disabled when button is disabled', () => {
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should include stock status in aria-label when out of stock', () => {
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');
      const label = button.getAttribute('aria-label');
      expect(label).toMatch(/out of stock/i);
    });
  });

  describe('Click Handling', () => {
    it('should not trigger click handler when disabled', async () => {
      const user = userEvent.setup();
      render(<AddToCartButton stock={0} productId="test-id" productName="Test Product" />);
      const button = screen.getByRole('button');

      await user.click(button);

      // Button should remain disabled and no action taken
      expect(button).toBeDisabled();
    });
  });
});
