import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Popup from "@/components/Popup";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

describe("Popup Component", () => {
  it("renders trigger and content", () => {
    const trigger = <button>Open Popup</button>;
    const content = <div>Popup Content</div>;

    render(
      <ThemeProvider theme={theme}>
        <Popup trigger={trigger} content={content} />
      </ThemeProvider>
    );

    expect(screen.getByText("Open Popup")).toBeInTheDocument();
    expect(screen.getByText("Popup Content")).toBeInTheDocument();
  });

  it("shows content when trigger is hovered", () => {
    const trigger = <button>Open Popup</button>;
    const content = <div>Popup Content</div>;

    render(
      <ThemeProvider theme={theme}>
        <Popup trigger={trigger} content={content} />
      </ThemeProvider>
    );

    fireEvent.mouseEnter(screen.getByText("Open Popup"));

    expect(screen.getByText("Popup Content")).toBeVisible();
  });

  it("hides content when trigger is not hovered", () => {
    const trigger = <button>Open Popup</button>;
    const content = <div>Popup Content</div>;

    render(
      <ThemeProvider theme={theme}>
        <Popup trigger={trigger} content={content} />
      </ThemeProvider>
    );

    fireEvent.mouseEnter(screen.getByText("Open Popup"));

    fireEvent.mouseLeave(screen.getByText("Open Popup"));

    expect(screen.getByText("Popup Content")).toBeVisible();
  });
});
