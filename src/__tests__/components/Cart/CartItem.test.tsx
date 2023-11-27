import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "@/app/cart/components/Cart/CartItem";
import { CartProvider } from "@/context/CartContext";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";

const showToastMock = jest.fn();
jest.mock("../../../context/ToastContext", () => ({
  useToast: () => ({
    addToast: showToastMock,
  }),
}));

const mockProduct = {
  id: 1,
  name: "Test Product",
  image: "/test-image.jpg",
  description: "This is a test product",
  price: 19.99,
};

const mockCartItemProps = {
  brand: "Test Brand",
  products: [
    {
      product: mockProduct,
      count: 2,
    },
  ],
};

describe("CartItem", () => {
  it("renders CartItem correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartItem {...mockCartItemProps} />
        </CartProvider>
      </ThemeProvider>
    );

    const brandElement = screen.getByText("Test Brand");
    const productElement = screen.getByText("Test Product");
    expect(brandElement).toBeInTheDocument();
    expect(productElement).toBeInTheDocument();

    const decreaseButton = screen.getByTestId("decrease-button");
    expect(decreaseButton).toBeInTheDocument();
  });

  it("handles decrease interaction correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartItem {...mockCartItemProps} />
        </CartProvider>
      </ThemeProvider>
    );

    const decreaseButton = screen.getByTestId("decrease-button");

    fireEvent.click(decreaseButton);

    expect(showToastMock).toHaveBeenCalledWith(
      "success",
      "Test Product's quantity decreased"
    );
  });

  it("handles increase interaction correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartItem {...mockCartItemProps} />
        </CartProvider>
      </ThemeProvider>
    );

    const increaseButton = screen.getByTestId("increase-button");

    fireEvent.click(increaseButton);

    expect(showToastMock).toHaveBeenCalledWith(
      "success",
      "Test Product's quantity increased"
    );
  });

  it("handles remove product interaction correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartItem {...mockCartItemProps} />
        </CartProvider>
      </ThemeProvider>
    );

    const removeButton = screen.getByTestId("remove-button");

    fireEvent.click(removeButton);

    expect(showToastMock).toHaveBeenCalledWith(
      "success",
      "Test Product deleted from cart"
    );
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartItem {...mockCartItemProps} />
        </CartProvider>
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
