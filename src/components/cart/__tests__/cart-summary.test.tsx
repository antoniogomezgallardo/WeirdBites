/**
 * CartSummary Component Tests
 *
 * Tests for cart summary display (subtotal, totals, checkout button)
 * Purpose: Show order summary and checkout CTA
 *
 * TDD Phase: RED (tests written first, should fail)
 */

import { render, screen } from '@testing-library/react';
import { CartSummary } from '../cart-summary';

describe('CartSummary', () => {
  it('should render subtotal correctly', () => {
    // Act
    render(<CartSummary subtotal={25.97} />);

    // Assert
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    // Price appears twice (subtotal + total), so use getAllByText
    const prices = screen.getAllByText('$25.97');
    expect(prices.length).toBeGreaterThanOrEqual(1);
  });

  it('should render total (same as subtotal for now)', () => {
    // Act
    render(<CartSummary subtotal={25.97} />);

    // Assert
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getAllByText('$25.97')).toHaveLength(2); // Subtotal + Total
  });

  it('should render checkout button', () => {
    // Act
    render(<CartSummary subtotal={25.97} />);

    // Assert
    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    expect(checkoutButton).toBeInTheDocument();
  });

  it('should disable checkout button when subtotal is 0', () => {
    // Act
    render(<CartSummary subtotal={0} />);

    // Assert
    const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
    expect(checkoutButton).toBeDisabled();
  });
});
