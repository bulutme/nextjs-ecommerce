/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import MainLayout from "@/components/Layout";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

const mockUseSearchParams = new URLSearchParams();
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => mockUseSearchParams),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useServerInsertedHTML: jest.fn(),
}));

jest.mock("../../../components/Layout/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Mocked Header</div>,
}));

describe("MainLayout component", () => {
  test("renders MainLayout component with Header and Content", () => {
    render(
      <ThemeProvider theme={theme}>
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      </ThemeProvider>
    );
  });

  test("renders MainLayout component without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <MainLayout>children</MainLayout>
      </ThemeProvider>
    );
  });
});
