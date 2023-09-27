import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Customers from './Customers';

describe('Customers Search Functionality', () => {
  it('should filter customers based on ID', async () => {
    render(<Customers />);

    // Simulate typing ID
    fireEvent.change(screen.getByPlaceholderText('Search customers...'), {
      target: { value: '6' },
    });

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
    await waitFor(() => {
      expect(screen.getByText(/Jennifer Davis/i)).toBeInTheDocument();
    });
  });
});

it('should filter customers based on first name', async () => {
  render(<Customers />);

  // Simulate typing
  fireEvent.change(screen.getByPlaceholderText('Search customers...'), {
    target: { value: 'Jennifer' },
  }); 

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
  await waitFor(() => {
    expect(screen.getByText(/Jennifer Davis/i)).toBeInTheDocument();
  });
});

it('should filter customers based on last name', async () => {
  render(<Customers />); 

  // Simulate typing
  fireEvent.change(screen.getByPlaceholderText('Search customers...'), {
    target: { value: 'Davis' },
  });

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
  await waitFor(() => {
    expect(screen.getByText(/Jennifer Davis/i)).toBeInTheDocument();
  });
});

it('should filter customers based on full name', async () => {
  render(<Customers />);

  // Simulate typing
  fireEvent.change(screen.getByPlaceholderText('Search customers...'), {
    target: { value: 'Jennifer Davis' },
  });
 
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
  await waitFor(() => {
    expect(screen.getByText(/Jennifer Davis/i)).toBeInTheDocument();
  });
});