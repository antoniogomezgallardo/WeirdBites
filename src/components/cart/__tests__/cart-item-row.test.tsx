/**
 * CartItemRow Component Tests
 *
 * Tests for individual cart item row display
 * Purpose: Display product details, quantity, and subtotal in cart
 *
 * TDD Phase: RED (tests written first, should fail)
 */

import { render, screen } from '@testing-library/react';
import { CartItemRow } from '../cart-item-row';

describe('CartItemRow', () => {
  const mockProduct = {
    id: 'product-1',
    name: 'Ghost Pepper Chocolate',
    price: 8.99,
    imageUrl: '/images/products/ghost-pepper-chocolate.jpg',
    stock: 15,
  };

  it('should render product image', () => {
    // Act
    render(<CartItemRow product={mockProduct} quantity={2} />);

    // Assert
    const image = screen.getByRole('img', { name: /ghost pepper chocolate/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('ghost-pepper-chocolate.jpg'));
  });

  it('should render product name', () => {
    // Act
    render(<CartItemRow product={mockProduct} quantity={2} />);

    // Assert
    expect(screen.getByText('Ghost Pepper Chocolate')).toBeInTheDocument();
  });

  it('should render product price', () => {
    // Act
    render(<CartItemRow product={mockProduct} quantity={2} />);

    // Assert
    expect(screen.getByText('$8.99')).toBeInTheDocument();
  });

  it('should render quantity', () => {
    // Act
    render(<CartItemRow product={mockProduct} quantity={2} />);

    // Assert
    expect(screen.getByText(/quantity.*2/i)).toBeInTheDocument();
  });

  it('should render subtotal (price × quantity)', () => {
    // Act
    render(<CartItemRow product={mockProduct} quantity={2} />);

    // Assert
    // 8.99 × 2 = 17.98
    expect(screen.getByText('$17.98')).toBeInTheDocument();
  });
});
