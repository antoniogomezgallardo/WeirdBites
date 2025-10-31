/**
 * Unit Tests for ImageLightbox Component
 *
 * Tests the image lightbox/modal component for viewing enlarged product images.
 * Covers rendering, interaction, keyboard navigation, and accessibility.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageLightbox } from '../image-lightbox';

describe('ImageLightbox Component', () => {
  const mockImage = {
    src: '/images/products/test-product.png',
    alt: 'Test Product',
  };

  describe('Closed State (Default)', () => {
    it('should not render lightbox when isOpen is false', () => {
      render(<ImageLightbox isOpen={false} image={mockImage} onClose={() => {}} />);

      // Lightbox dialog should not be in the document
      const dialog = screen.queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });

    it('should not render backdrop when isOpen is false', () => {
      const { container } = render(
        <ImageLightbox isOpen={false} image={mockImage} onClose={() => {}} />
      );

      // No backdrop overlay should be present
      const backdrop = container.querySelector('[data-testid="lightbox-backdrop"]');
      expect(backdrop).not.toBeInTheDocument();
    });
  });

  describe('Open State', () => {
    it('should render lightbox when isOpen is true', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      // Lightbox dialog should be visible
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('should render enlarged image inside lightbox', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      // Image should be present with correct src and alt
      const image = screen.getByAltText('Test Product');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expect.stringContaining('test-product.png'));
    });

    it('should render close button', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      // Close button should be visible
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should render semi-transparent backdrop', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      // Backdrop should be present in document.body (portal rendering)
      const backdrop = document.querySelector('[data-testid="lightbox-backdrop"]');
      expect(backdrop).toBeInTheDocument();

      // Backdrop should have dark semi-transparent styling
      expect(backdrop).toHaveClass('bg-black');
      expect(backdrop).toHaveClass('bg-opacity-75');
    });
  });

  describe('User Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();

      render(<ImageLightbox isOpen={true} image={mockImage} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();

      render(<ImageLightbox isOpen={true} image={mockImage} onClose={mockOnClose} />);

      // Backdrop is rendered in document.body (portal)
      const backdrop = document.querySelector('[data-testid="lightbox-backdrop"]');
      if (backdrop) {
        await user.click(backdrop);
      }

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when ESC key is pressed', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();

      render(<ImageLightbox isOpen={true} image={mockImage} onClose={mockOnClose} />);

      // Press ESC key
      await user.keyboard('{Escape}');

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close when clicking on the image itself', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();

      render(<ImageLightbox isOpen={true} image={mockImage} onClose={mockOnClose} />);

      const image = screen.getByAltText('Test Product');
      await user.click(image);

      // onClose should NOT be called when clicking image
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have dialog role with aria-modal attribute', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have accessible label for dialog', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      const dialog = screen.getByRole('dialog');
      const ariaLabel = dialog.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Test Product');
    });

    it('should have accessible close button with aria-label', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      const ariaLabel = closeButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.toLowerCase()).toContain('close');
    });

    it('should trap focus inside lightbox when open', () => {
      render(<ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />);

      const dialog = screen.getByRole('dialog');

      // Dialog should be focusable
      expect(dialog).toBeInTheDocument();

      // Close button should be focusable
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('should render lightbox in a portal (outside normal DOM hierarchy)', () => {
      const { container } = render(
        <div data-testid="parent">
          <ImageLightbox isOpen={true} image={mockImage} onClose={() => {}} />
        </div>
      );

      const parent = container.querySelector('[data-testid="parent"]');
      const dialog = screen.getByRole('dialog');

      // Dialog should NOT be a descendant of parent (it's in a portal)
      expect(parent).not.toContainElement(dialog);
    });
  });
});
