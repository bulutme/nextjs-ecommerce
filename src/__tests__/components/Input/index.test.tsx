import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Input from "@/components/Input";

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe("Input Component", () => {
  test("renders correctly", () => {
    const { container } = renderWithTheme(<Input />);
    expect(container).toMatchSnapshot();
  });

  test("applies focus styles correctly", () => {
    const { getByTestId } = renderWithTheme(<Input data-testid="input" />);
    const input = getByTestId("input");

    expect(input).not.toHaveStyle(`
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    `);

    input.focus();

    expect(input).toHaveStyle(`
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    `);
  });
});
