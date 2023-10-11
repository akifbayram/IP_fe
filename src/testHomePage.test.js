import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage'; 

describe('HomePage Component', () => {
  test('fetches and displays top movies and actors', async () => {
    render(<HomePage />);
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));

    // Verify movies / actors
    expect(screen.getByText(/BUCKET BROTHERHOOD/i)).toBeInTheDocument();
    expect(screen.getByText(/Juggler hardly/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Gina Degeneres/i)).toBeInTheDocument();
    expect(screen.getByText(/Sandra Kilmer/i)).toBeInTheDocument();
  });
});

describe('HomePage Component', () => {
  test('click a movie and check if the movie details card is filled', async () => {
    render(<HomePage />);
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
    
    fireEvent.click(screen.getByText(/Juggler hardly/i));

    // Debug
    // screen.debug();

    await waitFor(() => {
      expect(screen.getByText(/Release Year/i)).toBeInTheDocument();
      expect(screen.getByText(/2006/i)).toBeInTheDocument();
    });
  });
});