import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Cart from "@/app/cart/components/Cart";
import { CartProvider } from "@/context/CartContext";

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
};
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

test("Cart component renders correctly", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Cart />
      </CartProvider>
    </ThemeProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});
