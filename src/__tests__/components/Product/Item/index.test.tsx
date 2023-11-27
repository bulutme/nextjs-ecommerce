import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import ProductItem from "@/components/Product/Item";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

jest.mock("../../../../hooks/useLocalStorage", () => ({
  __esModule: true,
  default: jest.requireActual("../../../../hooks/useLocalStorage").default,
  useLocalStorage: jest.requireActual("../../../../hooks/useLocalStorage")
    .useLocalStorage,
}));

const sampleProduct = {
  id: 1,
  category: "Electronics",
  brand: "Sample Brand",
  price: 29.99,
  image: "https://source.unsplash.com/random/300×300",
  description: "Sample description",
  name: "Sample Product",
};

test("renders product information and add to cart button", () => {
  render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ToastProvider>
          <ProductItem {...sampleProduct} />
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );

  const brandElement = screen.getByText(sampleProduct.brand);
  const nameElement = screen.getByText(sampleProduct.name);
  const categoryElement = screen.getByText(sampleProduct.category);
  const priceElement = screen.getByText(`$${sampleProduct.price}`);
  const addToCartButton = screen.getByText(/add to cart/i);

  expect(brandElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(categoryElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  expect(addToCartButton).toBeInTheDocument();
});

test("matches snapshot when Add to Cart button is clicked", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ToastProvider>
          <ProductItem {...sampleProduct} />
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );

  const addToCartButton = screen.getByText(/add to cart/i);

  fireEvent.click(addToCartButton);

  expect(container).toMatchSnapshot();
});
