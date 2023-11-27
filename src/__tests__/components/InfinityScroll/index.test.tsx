/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InfinityScroll from "@/components/InfinityScroll";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "../../../__mocks__/intersectionObserverMock";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

jest.mock("../../../context/CartContext", () => ({
  ...jest.requireActual("../../../context/CartContext"),
  useCart: () => ({
    cart: [
      {
        id: "E9OAnv5I",
        brand: "Columbia",
        products: [
          {
            product: {
              id: 2,
              name: "Women's Ski Pants",
              description: "Warm and waterproof ski pants for women",
              image: "https://source.unsplash.com/random/300×300",
              price: 199.99,
              brand: "Columbia",
            },
            count: 4,
          },
        ],
      },
    ],
    addToCart: jest.fn(),
  }),
}));

test("InfinityScroll renders correctly with empty initial items", async () => {
  const initialItems: any[] = [];

  const fetchItems = async (page: number, search?: string) => {
    return {
      data: [],
      hasNextPage: false,
      page: 1,
    };
  };

  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <InfinityScroll
            initialItems={initialItems}
            hasNextPage={false}
            fetchItems={fetchItems}
          />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });
});

test("InfinityScroll renders correctly with no hasNextPage", async () => {
  const initialItems = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];

  const fetchItems = async (page: number, search?: string) => {
    return {
      data: [],
      hasNextPage: false,
      page: 1,
    };
  };

  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <InfinityScroll
            initialItems={initialItems}
            hasNextPage={false}
            fetchItems={fetchItems}
          />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });
});

test("InfinityScroll renders correctly with no items and hasNextPage", async () => {
  const initialItems: any[] = [];

  const fetchItems = async (page: number, search?: string) => {
    return {
      data: [],
      hasNextPage: true,
      page: 1,
    };
  };

  render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CartProvider>
          <InfinityScroll
            initialItems={initialItems}
            hasNextPage={true}
            fetchItems={fetchItems}
          />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );

  expect(screen.queryByTestId("loading-spinner")).toBeInTheDocument();
});
