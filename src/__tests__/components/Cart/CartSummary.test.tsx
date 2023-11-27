import React from "react";
import { render } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import CartSummary from "@/app/cart/components/Cart/CartSummary";

test("CartSummary renders correctly", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <CartSummary />
      </CartProvider>
    </ThemeProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});
