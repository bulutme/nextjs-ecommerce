import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "@/components/Search";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

test("calls onSearch with the correct query after typing", async () => {
  // Mock the onSearch function
  const mockOnSearch = jest.fn();

  // Render the SearchInput component
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={theme}>
      <SearchInput onSearch={mockOnSearch} initialValue="Initial Query" />
    </ThemeProvider>
  );

  // Get the input element by its placeholder text
  const inputElement = getByPlaceholderText(
    "Search by product, brand and category"
  );

  // Type a query into the input
  fireEvent.change(inputElement, { target: { value: "Test Query" } });

  // Wait for the debounce period to pass (300ms)
  await waitFor(() => {
    // Expect onSearch to be called with the correct query
    expect(mockOnSearch).toHaveBeenCalledWith("Test Query");
  });
});

test("calls onSearch with the correct query after a delay", async () => {
  // Mock the onSearch function
  const mockOnSearch = jest.fn();

  // Render the SearchInput component
  const { getByPlaceholderText } = render(
    <ThemeProvider theme={theme}>
      <SearchInput onSearch={mockOnSearch} />
    </ThemeProvider>
  );

  // Get the input element by its placeholder text
  const inputElement = getByPlaceholderText(
    "Search by product, brand and category"
  );

  // Type a query into the input
  fireEvent.change(inputElement, { target: { value: "Test Query" } });

  // Wait for a period longer than the debounce time (let's say 500 ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Expect onSearch to be called with the correct query
  expect(mockOnSearch).toHaveBeenCalledWith("Test Query");
});
