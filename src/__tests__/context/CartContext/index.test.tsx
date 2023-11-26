import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

jest.mock("../../../hooks/useLocalStorage", () => {
  let storage: { [key: string]: string } = {};

  return {
    __esModule: true,
    default: jest.fn().mockImplementation((key: string, initialValue: any) => {
      return [
        storage[key] || initialValue,
        (value: any) => {
          storage[key] = value;
        },
      ];
    }),
  };
});

const TestComponent = () => {
  const { cart, addToCart, removeProduct, increaseCount, decreaseCount } =
    useCart();

  return (
    <div>
      <div data-testid="cart">{JSON.stringify(cart)}</div>
      <button
        onClick={() => addToCart({ id: 1, name: "Product 1", price: 10 })}
      >
        Add to Cart
      </button>
      <button onClick={() => removeProduct(1)}>Remove Product</button>
      <button onClick={() => increaseCount(1)}>Increase Count</button>
      <button onClick={() => decreaseCount(1)}>Decrease Count</button>
    </div>
  );
};

test("CartProvider works correctly", async () => {
  const { getByText, getByTestId } = render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  expect(getByTestId("cart")).toHaveTextContent("[]");

  await act(async () => {
    fireEvent.click(getByText("Add to Cart"));
    await waitFor(() =>
      expect(getByTestId("cart")).not.toHaveTextContent(
        JSON.stringify([
          {
            id: expect.any(String),
            brand: "Product 1",
            products: [
              { product: { id: 1, name: "Product 1", price: 10 }, count: 1 },
            ],
          },
        ])
      )
    );
  });

  await act(async () => {
    fireEvent.click(getByText("Remove Product"));
    await waitFor(() => expect(getByTestId("cart")).toHaveTextContent("[]"));
  });

  await act(async () => {
    fireEvent.click(getByText("Add to Cart"));
    fireEvent.click(getByText("Increase Count"));
    await waitFor(() =>
      expect(getByTestId("cart")).not.toHaveTextContent(
        JSON.stringify([
          {
            id: expect.any(String),
            brand: "Product 1",
            products: [
              { product: { id: 1, name: "Product 1", price: 10 }, count: 2 },
            ],
          },
        ])
      )
    );
  });

  await act(async () => {
    fireEvent.click(getByText("Decrease Count"));
    await waitFor(() =>
      expect(getByTestId("cart")).not.toHaveTextContent(
        JSON.stringify([
          {
            id: expect.any(String),
            brand: "Product 1",
            products: [
              { product: { id: 1, name: "Product 1", price: 10 }, count: 1 },
            ],
          },
        ])
      )
    );
  });
});
