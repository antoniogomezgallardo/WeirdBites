import { render, screen } from '@testing-library/react';
import { WhyWeirdBites } from '../why-weirdbites';

describe('WhyWeirdBites', () => {
  it('renders section with correct heading', () => {
    render(<WhyWeirdBites />);

    const heading = screen.getByRole('heading', { name: /why weirdbites\?/i, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'why-weirdbites-heading');
  });

  it('renders section with correct subheading', () => {
    render(<WhyWeirdBites />);

    const subheading = screen.getByText(
      /we believe the best way to understand a culture is through its flavors/i
    );
    expect(subheading).toBeInTheDocument();
  });

  it('renders tagline text', () => {
    render(<WhyWeirdBites />);

    const tagline = screen.getByText(/experience the world one bite at a time/i);
    expect(tagline).toBeInTheDocument();
  });

  it('displays all three feature cards', () => {
    render(<WhyWeirdBites />);

    const featureCards = screen.getAllByTestId('why-weirdbites-feature');
    expect(featureCards).toHaveLength(3);
  });

  it('renders Global Discovery feature', () => {
    render(<WhyWeirdBites />);

    const featureTitle = screen.getByText(/global discovery/i);
    expect(featureTitle).toBeInTheDocument();

    const featureDescription = screen.getByText(/explore unique snacks from over 20 countries/i);
    expect(featureDescription).toBeInTheDocument();
  });

  it('renders Quality Guaranteed feature', () => {
    render(<WhyWeirdBites />);

    const featureTitle = screen.getByText(/quality guaranteed/i);
    expect(featureTitle).toBeInTheDocument();

    const featureDescription = screen.getByText(
      /all products are sourced from certified manufacturers/i
    );
    expect(featureDescription).toBeInTheDocument();
  });

  it('renders Fast & Secure Shipping feature', () => {
    render(<WhyWeirdBites />);

    const featureTitle = screen.getByText(/fast & secure shipping/i);
    expect(featureTitle).toBeInTheDocument();

    const featureDescription = screen.getByText(/free shipping on orders over \$50/i);
    expect(featureDescription).toBeInTheDocument();
  });

  it('displays trust indicators section', () => {
    render(<WhyWeirdBites />);

    expect(screen.getByText(/secure checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/free shipping over \$50/i)).toBeInTheDocument();
    expect(screen.getByText(/30-day returns/i)).toBeInTheDocument();
  });

  it('applies correct background color', () => {
    const { container } = render(<WhyWeirdBites />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white');
  });

  it('applies correct padding classes', () => {
    const { container } = render(<WhyWeirdBites />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('sm:py-20');
  });

  it('has correct ARIA label for accessibility', () => {
    render(<WhyWeirdBites />);

    const section = screen.getByRole('region', { name: /why weirdbites\?/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'why-weirdbites-heading');
  });

  it('applies responsive grid classes to features', () => {
    const { container } = render(<WhyWeirdBites />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1'); // Mobile: 1 column
    expect(grid).toHaveClass('md:grid-cols-3'); // Desktop: 3 columns
  });

  it('renders feature icons with correct styling', () => {
    const { container } = render(<WhyWeirdBites />);

    const iconContainers = container.querySelectorAll('.rounded-full.bg-green-100');
    expect(iconContainers).toHaveLength(3);

    iconContainers.forEach(iconContainer => {
      expect(iconContainer).toHaveClass('h-16');
      expect(iconContainer).toHaveClass('w-16');
      expect(iconContainer).toHaveClass('text-green-600');
    });
  });

  it('renders SVG icons for each feature', () => {
    const { container } = render(<WhyWeirdBites />);

    const svgIcons = container.querySelectorAll('svg');
    // 3 feature icons + 3 trust indicator icons = 6 total
    expect(svgIcons.length).toBeGreaterThanOrEqual(6);
  });

  it('renders trust indicators with correct styling', () => {
    const { container: _container } = render(<WhyWeirdBites />);

    const trustIndicators = _container.querySelector('.border-t.border-gray-200');
    expect(trustIndicators).toBeInTheDocument();
    expect(trustIndicators).toHaveClass('pt-8');
  });

  it('applies center alignment to feature cards', () => {
    render(<WhyWeirdBites />);

    const featureCards = screen.getAllByTestId('why-weirdbites-feature');
    featureCards.forEach(card => {
      expect(card).toHaveClass('text-center');
    });
  });

  it('applies correct heading styling', () => {
    render(<WhyWeirdBites />);

    const heading = screen.getByRole('heading', { name: /why weirdbites\?/i });
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-gray-900');
    expect(heading).toHaveClass('sm:text-4xl');
  });

  it('applies correct feature title styling', () => {
    const { container } = render(<WhyWeirdBites />);

    const featureTitles = container.querySelectorAll('h3');
    expect(featureTitles).toHaveLength(3);

    featureTitles.forEach(title => {
      expect(title).toHaveClass('text-xl');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('text-gray-900');
    });
  });
});
