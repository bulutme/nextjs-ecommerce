import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Container from "@/components/Container";
import { theme } from "@/styles/theme";

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe("Container Component", () => {
  test("renders correctly", () => {
    const { container } = renderWithTheme(
      <Container>
        <div>Child Content</div>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });
});
