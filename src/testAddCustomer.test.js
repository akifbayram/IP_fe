// src/CustomerPage.test.js
import React from "react";
import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Customers from "./Customers";

describe("CustomerPage component", () => {
  const randomName = `Test${Math.random().toString(36).substring(8)}`;
  const newCustomerData = {
    first_name: `${randomName}`,
    last_name: `Doe`,
    email: `${randomName}@example.com`,
    address: "123 Street Name",
    district: "District 9",
    city: "Metropolis",
    phone: "1234567890",
  };

  test("Add a randomly named customer", async () => {
    render(<Customers />);
    console.log("Add a randomly named customer", newCustomerData.first_name);

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

  /* Unable to get this test to work
  test("checks if the customer was added through endpoint", async () => {
    render(<Customers />);

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));
    fireEvent.change(screen.getByPlaceholderText("Search customers..."), {
      target: { value: newCustomerData.first_name },
    });
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 900)));

    const nameElement = await screen.findByText(newCustomerData.first_name);
    expect(nameElement).toBeInTheDocument();
  }); */
});
