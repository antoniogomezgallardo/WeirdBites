import { render, screen } from '@testing-library/react';
import ProductDetailPage from '../page';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProductDetailPage', () => {
  const mockProduct = {
    id: 'test-product-id',
    name: 'Durian Chips',
    description: 'Crispy chips made from the king of fruits. Love it or hate it!',
    price: 12.99,
    imageUrl: '/images/products/durian-chips.png',
    category: 'Snacks',
    origin: 'Thailand',
    stock: 50,
    createdAt: new Date('2025-10-30'),
    updatedAt: new Date('2025-10-30'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product name correctly', async () => {
    // Arrange
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Act
    const page = await ProductDetailPage({ params: Promise.resolve({ id: 'test-product-id' }) });
    render(page);

    // Assert
    expect(screen.getByText('Durian Chips')).toBeInTheDocument();
  });

  it('should display formatted price ($XX.XX)', async () => {
    // Arrange
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Act
    const page = await ProductDetailPage({ params: Promise.resolve({ id: 'test-product-id' }) });
    render(page);

    // Assert
    expect(screen.getByText(/\$12\.99/)).toBeInTheDocument();
  });

  it('should show full description', async () => {
    // Arrange
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Act
    const page = await ProductDetailPage({ params: Promise.resolve({ id: 'test-product-id' }) });
    render(page);

    // Assert
    expect(screen.getByText(/Crispy chips made from the king of fruits/)).toBeInTheDocument();
  });

  it('should display category and origin', async () => {
    // Arrange
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Act
    const page = await ProductDetailPage({ params: Promise.resolve({ id: 'test-product-id' }) });
    render(page);

    // Assert
    expect(screen.getByText(/Snacks/)).toBeInTheDocument();
    expect(screen.getByText(/Thailand/)).toBeInTheDocument();
  });

  it('should render product image with alt text', async () => {
    // Arrange
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Act
    const page = await ProductDetailPage({ params: Promise.resolve({ id: 'test-product-id' }) });
    render(page);

    // Assert
    const image = screen.getByAltText('Durian Chips');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/products/durian-chips.png');
  });
});
