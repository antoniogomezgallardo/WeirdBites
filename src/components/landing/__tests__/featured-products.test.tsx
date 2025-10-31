import { render, screen } from '@testing-library/react';
import { FeaturedProducts } from '../featured-products';

const mockProducts = [
  {
    id: 'product-1',
    name: 'Black Garlic Chocolate',
    description: 'Dark chocolate infused with aged black garlic for a unique umami sweetness',
    price: 12.99,
    imageUrl: '/images/products/black-garlic-chocolate.jpg',
    category: 'Chocolate',
    origin: 'Japan',
  },
  {
    id: 'product-2',
    name: 'Sriracha Popcorn',
    description: 'Spicy and tangy popcorn coated with authentic sriracha seasoning',
    price: 8.99,
    imageUrl: '/images/products/sriracha-popcorn.jpg',
    category: 'Snacks',
    origin: 'Thailand',
  },
  {
    id: 'product-3',
    name: 'Wasabi Peas',
    description: 'Crunchy roasted peas with a fiery wasabi kick',
    price: 6.99,
    imageUrl: '/images/products/wasabi-peas.jpg',
    category: 'Snacks',
    origin: 'Japan',
  },
];

describe('FeaturedProducts', () => {
  it('renders section with correct heading', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const heading = screen.getByRole('heading', { name: /featured snacks/i, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'featured-heading');
  });

  it('renders section with correct subheading', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const subheading = screen.getByText(
      /handpicked weird and wonderful snacks from around the world/i
    );
    expect(subheading).toBeInTheDocument();
  });

  it('displays all featured products passed as props', () => {
    render(<FeaturedProducts products={mockProducts} />);

    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });

    // Check origins are present (may appear multiple times)
    expect(screen.getAllByText(/Japan|Thailand/i).length).toBeGreaterThan(0);
  });

  it('renders product cards with data-testid attribute', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const productCards = screen.getAllByTestId('featured-product-card');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('product cards link to correct detail pages', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const productLinks = screen.getAllByTestId('featured-product-card');
    mockProducts.forEach((product, index) => {
      expect(productLinks[index]).toHaveAttribute('href', `/products/${product.id}`);
    });
  });

  it('displays featured badge on each product card', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const badges = screen.getAllByText('Featured');
    expect(badges).toHaveLength(mockProducts.length);
  });

  it('renders product images with correct alt text', () => {
    render(<FeaturedProducts products={mockProducts} />);

    mockProducts.forEach(product => {
      const image = screen.getByAltText(product.name);
      expect(image).toBeInTheDocument();
    });
  });

  it('renders "View All Products" button with correct link', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const viewAllLink = screen.getByRole('link', { name: /view all products/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/products');
  });

  it('applies correct responsive grid classes', () => {
    const { container } = render(<FeaturedProducts products={mockProducts} />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1'); // Mobile: 1 column
    expect(grid).toHaveClass('sm:grid-cols-2'); // Tablet: 2 columns
    expect(grid).toHaveClass('lg:grid-cols-3'); // Desktop: 3 columns
  });

  it('has correct ARIA label for accessibility', () => {
    render(<FeaturedProducts products={mockProducts} />);

    const section = screen.getByRole('region', { name: /featured snacks/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'featured-heading');
  });

  it('renders correctly with empty products array', () => {
    render(<FeaturedProducts products={[]} />);

    const heading = screen.getByRole('heading', { name: /featured snacks/i });
    expect(heading).toBeInTheDocument();

    const productCards = screen.queryAllByTestId('featured-product-card');
    expect(productCards).toHaveLength(0);
  });

  it('formats prices correctly with two decimal places', () => {
    const productsWithVariedPrices = [
      { ...mockProducts[0], price: 10 },
      { ...mockProducts[1], price: 9.5 },
      { ...mockProducts[2], price: 12.99 },
    ];

    render(<FeaturedProducts products={productsWithVariedPrices} />);

    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$9.50')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('truncates long descriptions with line-clamp', () => {
    const { container } = render(<FeaturedProducts products={mockProducts} />);

    const descriptions = container.querySelectorAll('.line-clamp-2');
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('applies hover state classes to product cards', () => {
    const { container } = render(<FeaturedProducts products={mockProducts} />);

    const productCards = container.querySelectorAll('[data-testid="featured-product-card"]');
    productCards.forEach(card => {
      expect(card).toHaveClass('hover:shadow-xl');
    });
  });

  it('applies hover state classes to product names', () => {
    const { container } = render(<FeaturedProducts products={mockProducts} />);

    const productNames = container.querySelectorAll('h3');
    productNames.forEach(name => {
      expect(name).toHaveClass('group-hover:text-green-600');
    });
  });

  it('applies hover scale effect to product images', () => {
    const { container } = render(<FeaturedProducts products={mockProducts} />);

    const images = container.querySelectorAll('img');
    images.forEach(image => {
      expect(image).toHaveClass('group-hover:scale-105');
    });
  });
});
