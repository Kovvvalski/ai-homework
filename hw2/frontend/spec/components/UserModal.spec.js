import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserModal from '../../src/components/UserModal';

describe('UserModal Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'https://johndoe.com',
    company: {
      name: 'Company A',
      catchPhrase: 'Best company ever',
      bs: 'Making things better'
    },
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: 40.7128,
        lng: -74.0060
      }
    }
  };

  test('renders user details correctly', () => {
    render(<UserModal open={true} onClose={() => {}} user={mockUser} />);

    // Check personal information
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('https://johndoe.com')).toBeInTheDocument();

    // Check company information
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Best company ever')).toBeInTheDocument();
    expect(screen.getByText('Making things better')).toBeInTheDocument();

    // Check address information
    expect(screen.getByText('123 Main St, Apt 4B')).toBeInTheDocument();
    expect(screen.getByText('New York, 10001')).toBeInTheDocument();
  });

  test('handles close button click', () => {
    const handleClose = jest.fn();
    render(<UserModal open={true} onClose={handleClose} user={mockUser} />);

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when closed', () => {
    render(<UserModal open={false} onClose={() => {}} user={mockUser} />);
    expect(screen.queryByText('User Details')).not.toBeInTheDocument();
  });

  test('renders clickable links with correct attributes', () => {
    render(<UserModal open={true} onClose={() => {}} user={mockUser} />);

    // Check email link
    const emailLink = screen.getByText('john@example.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john@example.com');

    // Check phone link
    const phoneLink = screen.getByText('123-456-7890');
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:123-456-7890');

    // Check website link
    const websiteLink = screen.getByText('https://johndoe.com');
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://johndoe.com');
    expect(websiteLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(websiteLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');

    // Check map link
    const mapLink = screen.getByText('View on Map');
    expect(mapLink.closest('a')).toHaveAttribute(
      'href',
      'https://www.google.com/maps?q=40.7128,-74.0060'
    );
    expect(mapLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(mapLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('handles missing optional data gracefully', () => {
    const userWithMissingData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'https://johndoe.com'
    };

    render(<UserModal open={true} onClose={() => {}} user={userWithMissingData} />);

    // Check that required fields are still present
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('https://johndoe.com')).toBeInTheDocument();

    // Check that optional sections are not rendered
    expect(screen.queryByText('Company Information')).not.toBeInTheDocument();
    expect(screen.queryByText('Address Information')).not.toBeInTheDocument();
  });

  test('handles null user gracefully', () => {
    render(<UserModal open={true} onClose={() => {}} user={null} />);
    expect(screen.queryByText('User Details')).not.toBeInTheDocument();
  });
}); 