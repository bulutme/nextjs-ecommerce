import { NextRequest, NextResponse } from "next/server";
import products from "./products.json";
import { Product } from "@/app/types/Product/types";

const ITEMS_PER_PAGE = 8;

function sanitizeText(text: string) {
  const sanitizedText = text.replace(/[^\w\s]/gi, "");
  const cleanedText = sanitizedText.replace(/\s+/g, " ");

  return cleanedText.trim();
}

function filterProductsByQuery(products: Product[], query: string) {
  const sanitizedQuery = sanitizeText(query);

  const queryTerms = sanitizedQuery.toLowerCase().split(/\s+/).filter(Boolean);

  if (queryTerms.length === 0) {
    return products;
  }

  return queryTerms.reduce((result, term) => {
    const termFilteredProducts = result.filter((product) => {
      return sanitizeText(product.name.toLowerCase()).includes(
        sanitizeText(term)
      );
    });

    return [...termFilteredProducts];
  }, products);
}

function sliceProducts(products: Product[], pageNumber: number) {
  const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const slicedProducts = products.slice(startIndex, endIndex);
  const hasNextPage = endIndex < products.length;

  return {
    data: slicedProducts,
    page: pageNumber,
    hasNextPage: hasNextPage,
  };
}

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1", 10);

    if (query === "all" || !query) {
      const productData = sliceProducts(products, page);
      return NextResponse.json(productData);
    }

    const filteredProducts = filterProductsByQuery(products, query);
    const productData = sliceProducts(filteredProducts, page);

    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.error();
  }
};
