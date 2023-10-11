// src/ManageCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManageCard from './ManageCard';
import axios from 'axios';

jest.mock('axios');

describe('ManageCard component', () => {
  test('searchCustomers function gets called on Search button click', async () => {
    // Mock the axios.get method
    axios.get.mockResolvedValueOnce({
      data: [{ customer_id: 1, first_name: 'John', last_name: 'Doe' }]
    });

    render(<ManageCard type="movie" data={{}} onClose={() => {}} onEditSuccess={() => {}} onDeleteSuccess={() => {}} />);

    // Fill the search input field
    fireEvent.change(screen.getByPlaceholderText('Search for customer...'), {
      target: { value: 'John' },
    });

    // Click the Search button
    fireEvent.click(screen.getByText('Search'));

    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Now check if the mock function got called
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/customers/search?q=John');
  });
});
