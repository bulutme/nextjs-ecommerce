"use server";

import { Product } from "./types/Product/types";

interface FetchProductsResponse {
  data: Product[];
  page: number;
  hasNextPage: boolean;
}

const fetchProducts = async (
  page: number,
  search?: string
): Promise<FetchProductsResponse> => {
  const url = new URL(`http://localhost:3000/api/products?page=${page}`);

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
