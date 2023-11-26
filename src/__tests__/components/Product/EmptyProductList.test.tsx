import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyProductList from "@/components/Product/EmptyProductList";

test("renders 'No products found.' message", () => {
  render(<EmptyProductList />);

  const messageElement = screen.getByText(/No products found./i);
  expect(messageElement).toBeInTheDocument();
});
