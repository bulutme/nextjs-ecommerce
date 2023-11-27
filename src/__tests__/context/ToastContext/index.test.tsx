import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ToastProvider, useToast } from "@/context/ToastContext";

const TestComponent: React.FC = () => {
  const { addToast } = useToast();

  const handleAddSuccessToast = () => {
    addToast("success", "Success Message");
  };

  const handleAddErrorToast = () => {
    addToast("error", "Error Message");
  };

  return (
    <div>
      <button onClick={handleAddSuccessToast} data-testid="success-toast">
        Add Success Toast
      </button>
      <button onClick={handleAddErrorToast} data-testid="error-toast">
        Add Error Toast
      </button>
    </div>
  );
};

test("ToastProvider works correctly", async () => {
  const { getByTestId, queryByTestId } = render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );

  expect(queryByTestId("success-toast")).not.toBeNull();
  expect(queryByTestId("error-toast")).not.toBeNull();

  fireEvent.click(getByTestId("success-toast"));

  await waitFor(() => {
    expect(queryByTestId("success-toast")).toBeInTheDocument();
  });

  fireEvent.click(getByTestId("error-toast"));

  await waitFor(() => {
    expect(queryByTestId("error-toast")).toBeInTheDocument();
  });
});
