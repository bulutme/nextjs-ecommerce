import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Toaster from "@/components/Toast";
import { ToastProvider, useToast } from "@/context/ToastContext";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

jest.mock("react-icons/fa", () => ({
  FaCheckCircle: () => (
    <div className="fa-check-circle" data-testid="fa-check-circle" />
  ),
  FaTimesCircle: () => (
    <div className="fa-times-circle" data-testid="fa-times-circle" />
  ),
}));

jest.mock("../../../context/ToastContext", () => ({
  ...jest.requireActual("../../../context/ToastContext"),
  useToast: jest.fn(),
}));

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
mockUseToast.mockReturnValue({
  toasts: [],
  addToast: jest.fn(),
  removeToast: jest.fn(),
});

test("renders Toaster component with exit toast", async () => {
  mockUseToast.mockReturnValueOnce({
    toasts: [{ id: 3, type: "exit", message: "Exit Toast" }],
    addToast: jest.fn(),
    removeToast: jest.fn(),
  });

  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  );

  const exitToast = screen.getByText("Exit Toast");
  const exitIcon = screen.getByTestId("fa-times-circle");

  expect(exitToast).toBeInTheDocument();
  expect(exitIcon).toBeInTheDocument();

  await waitFor(() => {
    setTimeout(() => {
      expect(screen.queryByText("Exit Toast")).toBeNull();
    }, 3000);
  });
});

test("renders Toaster component with success and error toasts", async () => {
  mockUseToast.mockReturnValueOnce({
    toasts: [
      { id: 1, type: "success", message: "Success Toast" },
      { id: 2, type: "error", message: "Error Toast" },
    ],
    addToast: jest.fn(),
    removeToast: jest.fn(),
  });

  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  );

  const successToast = screen.getByText("Success Toast");
  const successIcon = screen.getByTestId("fa-check-circle");
  const errorToast = screen.getByText("Error Toast");
  const errorIcon = screen.getByTestId("fa-times-circle");

  expect(successToast).toBeInTheDocument();
  expect(successIcon).toBeInTheDocument();
  expect(errorToast).toBeInTheDocument();
  expect(errorIcon).toBeInTheDocument();

  await waitFor(() => {
    setTimeout(() => {
      expect(screen.queryByText("Success Toast")).toBeNull();
      expect(screen.queryByText("Error Toast")).toBeNull();
    }, 3000);
  });
});
