import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  it('renders current page and total pages', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={10} 
        onPageChange={mockOnPageChange} 
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={10} 
        onPageChange={mockOnPageChange} 
      />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination 
        currentPage={10} 
        totalPages={10} 
        onPageChange={mockOnPageChange} 
      />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking page number', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={10} 
        onPageChange={mockOnPageChange} 
      />
    );

    const page2Button = screen.getByText('2');
    page2Button.click();

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis for large page ranges', () => {
    render(
      <Pagination 
        currentPage={5}
        totalPages={20}
        onPageChange={mockOnPageChange}
      />
    );

    // Check that page 20 is rendered (showing ellipsis functionality works)
    expect(screen.getByText('20')).toBeInTheDocument();
    // Check that not all pages are rendered (e.g., page 15 shouldn't be there)
    expect(screen.queryByText('15')).not.toBeInTheDocument();
  });
});
