import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserTable from '../../src/components/UserTable';
import { fetchUsers } from '../../src/services/userService';

// Mock the userService
jest.mock('../../src/services/userService');

describe('UserTable Component', () => {
  const mockUsers = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `123-456-${i + 1}`,
    website: `https://user${i + 1}.com`,
    company: { name: `Company ${i + 1}` },
    address: {
      street: `Street ${i + 1}`,
      city: `City ${i + 1}`,
      geo: { lat: i, lng: i }
    }
  }));

  beforeEach(() => {
    fetchUsers.mockResolvedValue(mockUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<UserTable />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders users after loading', async () => {
    render(<UserTable />);
    
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });
  });

  test('handles error state', async () => {
    fetchUsers.mockRejectedValue(new Error('Failed to fetch'));
    render(<UserTable />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    });
  });

  test('opens modal when clicking on a user row', async () => {
    render(<UserTable />);
    
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('User 1'));
    
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  test('handles pagination correctly', async () => {
    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Check initial page
    expect(screen.getByText('1-10 of 15')).toBeInTheDocument();

    // Change rows per page
    const rowsPerPageSelect = screen.getByRole('button', { name: /rows per page/i });
    fireEvent.mouseDown(rowsPerPageSelect);
    fireEvent.click(screen.getByRole('option', { name: '25' }));

    // Check if all users are visible
    await waitFor(() => {
      expect(screen.getByText('1-15 of 15')).toBeInTheDocument();
    });
  });

  test('handles user deletion', async () => {
    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Delete first user
    const deleteButton = screen.getAllByRole('button', { name: /delete user/i })[0];
    fireEvent.click(deleteButton);

    // Check if user is removed and snackbar appears
    await waitFor(() => {
      expect(screen.queryByText('User 1')).not.toBeInTheDocument();
      expect(screen.getByText('User deleted successfully')).toBeInTheDocument();
    });
  });

  test('handles pagination after user deletion', async () => {
    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Delete users from first page
    const deleteButtons = screen.getAllByRole('button', { name: /delete user/i });
    deleteButtons.forEach(button => fireEvent.click(button));

    // Check if pagination updates correctly
    await waitFor(() => {
      expect(screen.getByText('1-5 of 5')).toBeInTheDocument();
    });
  });

  test('handles website links correctly', async () => {
    render(<UserTable />);

    await waitFor(() => {
      const websiteLink = screen.getByText('https://user1.com');
      expect(websiteLink).toBeInTheDocument();
      expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://user1.com');
      expect(websiteLink.closest('a')).toHaveAttribute('target', '_blank');
      expect(websiteLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('maintains table state after modal interaction', async () => {
    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Open modal
    fireEvent.click(screen.getByText('User 1'));
    expect(screen.getByText('User Details')).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('Close'));

    // Check if table state is maintained
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.queryByText('User Details')).not.toBeInTheDocument();
  });
}); 