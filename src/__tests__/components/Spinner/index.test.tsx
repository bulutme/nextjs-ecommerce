import React from "react";
import { render } from "@testing-library/react";
import Spinner from "@/components/Spinner";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

test("renders Spinner correctly", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Spinner />
    </ThemeProvider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
