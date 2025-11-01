/**
 * EmptyCart Component Tests
 *
 * Tests for the empty cart state display component
 * Purpose: Show user-friendly message when cart is empty with CTA to browse products
 *
 * TDD Phase: RED (tests written first, should fail)
 */

import { render, screen } from '@testing-library/react';
import { EmptyCart } from '../empty-cart';

describe('EmptyCart', () => {
  it('should render empty cart message', () => {
    // Act
    render(<EmptyCart />);

    // Assert
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('should render shopping bag icon', () => {
    // Act
    render(<EmptyCart />);

    // Assert
    const icon = screen.getByTestId('empty-cart-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render link to products page', () => {
    // Act
    render(<EmptyCart />);

    // Assert
    const link = screen.getByRole('link', { name: /browse products/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/products');
  });
});
