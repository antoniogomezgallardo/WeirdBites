import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  describe('Happy Path', () => {
    it('renders prev and next buttons', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('shows current page and total pages', () => {
      render(<Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />);

      expect(screen.getByText(/page 2 of 10/i)).toBeInTheDocument();
    });

    it('calls onPageChange when next button is clicked', async () => {
      const user = userEvent.setup();
      render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('buttons meet minimum 44x44px touch target size', () => {
      render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      // Verify buttons have minimum height and width classes
      expect(prevButton).toHaveClass('min-h-[44px]');
      expect(prevButton).toHaveClass('min-w-[44px]');
      expect(nextButton).toHaveClass('min-h-[44px]');
      expect(nextButton).toHaveClass('min-w-[44px]');
    });
  });

  describe('Error Scenarios', () => {
    it('disables previous button on first page', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('does not call onPageChange when disabled button is clicked', async () => {
      const user = userEvent.setup();
      render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      await user.click(prevButton);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    it('handles single page (totalPages=1) by disabling both buttons', () => {
      render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });
});
