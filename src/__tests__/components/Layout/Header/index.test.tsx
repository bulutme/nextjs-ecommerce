/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Header from "@/components/Layout/Header";
import { CartProvider } from "@/context/CartContext";

jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
};
const mockUseSearchParams = new URLSearchParams();
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => mockUseSearchParams),
  usePathname: jest.fn(),
  useRouter: () => mockRouter,
}));

const mockUseCart = {
  totalItemCount: 2,
};
jest.mock("../../../../context/CartContext", () => ({
  useCart: jest.fn(() => mockUseCart),
}));

describe("Header component", () => {
  test("renders Header component", () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByAltText("next logo")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product, brand and category")
    ).toBeInTheDocument();
    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });

  test("renders Header component with different data", () => {
    const mockUseCart = {
      totalItemCount: 5,
    };
    jest.mock("../../../../context/CartContext", () => ({
      useCart: jest.fn(() => mockUseCart),
    }));

    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByAltText("next logo")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product, brand and category")
    ).toBeInTheDocument();
    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  test("matches snapshot with different data", () => {
    const mockUseCart = {
      totalItemCount: 5,
    };
    jest.mock("../../../../context/CartContext", () => ({
      useCart: jest.fn(() => mockUseCart),
    }));

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
