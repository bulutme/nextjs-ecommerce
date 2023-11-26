import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Button, { ButtonProps } from "../../../components/Button";
import { theme } from "@/styles/theme";

const renderWithTheme = (
  component: React.ReactElement,
  options?: RenderOptions
) => render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, options);

describe("Button Component", () => {
  const commonProps: ButtonProps = {
    color: "primary",
    size: "medium",
    $fullwidth: false,
  };

  test("renders correctly", () => {
    const { container } = renderWithTheme(
      <Button {...commonProps}>Click me</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders correctly with icon and loading", () => {
    const { container } = renderWithTheme(
      <Button {...commonProps} icon={<span>🚀</span>} loading>
        Click me
      </Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders correctly with specific props", () => {
    const { container } = renderWithTheme(
      <Button {...commonProps} $variant="link" size="small" $fullwidth disabled>
        Click me
      </Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
