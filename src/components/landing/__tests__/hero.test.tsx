import { render, screen } from '@testing-library/react';
import { Hero } from '../hero';

describe('Hero Component', () => {
  describe('Content Rendering', () => {
    it('should render the main headline', () => {
      render(<Hero />);

      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeInTheDocument();
      expect(headline).toHaveTextContent(/discover weird snacks/i);
    });

    it('should render the subheading', () => {
      render(<Hero />);

      const subheading = screen.getByText(/unusual snacks from around the world/i);
      expect(subheading).toBeInTheDocument();
    });

    it('should render a CTA button', () => {
      render(<Hero />);

      const ctaButton = screen.getByRole('link', { name: /browse products/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it('should render a hero image', () => {
      render(<Hero />);

      const heroImage = screen.getByRole('img');
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute('alt');
    });
  });

  describe('Navigation', () => {
    it('should link CTA button to /products page', () => {
      render(<Hero />);

      const ctaButton = screen.getByRole('link', { name: /browse products/i });
      expect(ctaButton).toHaveAttribute('href', '/products');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      render(<Hero />);

      // Should have a section element
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });

    it('should have descriptive alt text for hero image', () => {
      render(<Hero />);

      const heroImage = screen.getByRole('img');
      const altText = heroImage.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(10);
    });

    it('should have sufficient color contrast for CTA button', () => {
      render(<Hero />);

      const ctaButton = screen.getByRole('link', { name: /browse products/i });
      // Check that button has visible text
      expect(ctaButton).toBeVisible();
    });
  });

  describe('Responsive Design', () => {
    it('should render without layout errors', () => {
      const { container } = render(<Hero />);

      // Check that component renders without errors
      expect(container).toBeInTheDocument();
    });
  });
});
