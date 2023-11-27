import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import CartPopup from "@/app/cart/components/Cart/CartPopup";
import { ToastProvider } from "@/context/ToastContext";
import CartItem from "@/app/cart/components/Cart/CartItem";

const mockProduct = {
  id: 1,
  name: "Test Product",
  image: "/test-image.jpg",
  description: "This is a test product",
  price: 19.99,
};

const mockCartItemProps = {
  brand: "Test Brand",
  products: [
    {
      product: mockProduct,
      count: 2,
    },
  ],
};

test("CartPopup renders correctly", () => {
  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <CartPopup>content</CartPopup>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  expect(screen.queryByText("My Cart")).toBeNull();
});

test("CartPopup snapshot test", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <CartPopup>content</CartPopup>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("CartItem snapshot test inside CartPopup", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <CartPopup>
            <CartItem {...mockCartItemProps} />
          </CartPopup>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Go to Cart button is rendered and clickable", () => {
  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <CartPopup>
            <button onClick={() => {}}>Open Popup</button>
            <button onClick={() => {}}>Go to Cart</button>
          </CartPopup>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  const openPopupButton = screen.getByText("Open Popup");
  fireEvent.click(openPopupButton);

  const goToCartButton = screen.getByText("Go to Cart");

  expect(openPopupButton).toBeInTheDocument();
  expect(goToCartButton).toBeInTheDocument();

  fireEvent.click(goToCartButton);
});
