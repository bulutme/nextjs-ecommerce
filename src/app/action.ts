"use server";

import { FetchResponse, Product } from "./types/Product/types";

// function to fetch products from the API based on the page number and optional search query.
const fetchProducts = async (
  page: number,
  search?: string
): Promise<FetchResponse<Product>> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}`
  );

  if (search) {
    url.searchParams.append("query", search);
  }

  try {
    const response = await fetch(url.toString(), {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchProducts };
