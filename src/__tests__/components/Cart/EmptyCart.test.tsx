import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import EmptyCart from "@/app/cart/components/Cart/EmptyCart";

test("EmptyCart renders correctly", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <EmptyCart />
    </ThemeProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});
