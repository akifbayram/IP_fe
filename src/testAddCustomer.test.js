// src/CustomerPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Customers from "./Customers";
import axios from "axios";

describe("CustomerPage component", () => {
  const randomName = `TestCustomer-${Math.random().toString(36).substring(7)}`;
  const newCustomerData = {
    first_name: `John-${randomName}`,
    last_name: `Doe-${randomName}`,
    email: `${randomName}@example.com`,
    address: "123 Street Name",
    district: "District 9",
    city: "Metropolis",
    country: "Algeria",
    phone: "1234567890",
  };

  test("Add a randomly named customer", async () => {
    render(<Customers />);

    fireEvent.click(screen.getByText("Add Customer"));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: newCustomerData.first_name },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: newCustomerData.last_name },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: newCustomerData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: newCustomerData.address },
    });
    fireEvent.change(screen.getByPlaceholderText("District"), {
      target: { value: newCustomerData.district },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: newCustomerData.city },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: newCustomerData.phone },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));
  });

    test('checks if the customer was added through endpoint', async () => {
    const response = await axios.get('http://localhost:3000/customers');
    const customers = response.data;
    const customer = customers.find((customer) => customer.email === newCustomerData.email);
    expect(customer).toBeTruthy(); 
    }
    );

});

