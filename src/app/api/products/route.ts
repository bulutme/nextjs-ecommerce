import { NextRequest, NextResponse } from "next/server";
import products from "./products.json";
import { Product } from "@/app/types/Product/types";

const ITEMS_PER_PAGE = 8;

// removing special characters and extra spaces.
function sanitizeText(text: string) {
  const sanitizedText = text.replace(/[^\w\s]/gi, "");
  const cleanedText = sanitizedText.replace(/\s+/g, " ");

  return cleanedText.trim();
}

// filter products based on the search query.
function filterProductsByQuery(products: Product[], query: string) {
  const sanitizedQuery = sanitizeText(query);

  const queryTerms = sanitizedQuery.toLowerCase().split(/\s+/).filter(Boolean);

  if (queryTerms.length === 0) {
    return products;
  }

  const filteredProducts = products.filter((product) => {
    return queryTerms.every((term) => {
      const termInName = sanitizeText(product.name.toLowerCase()).includes(
        term
      );
      const termInCategory = sanitizeText(
        product.category.toLowerCase()
      ).includes(term);
      const termInBrand = sanitizeText(product.brand.toLowerCase()).includes(
        term
      );

      return termInName || termInCategory || termInBrand;
    });
  });

  return filteredProducts;
}

// slice the array of products based on the page number and items per page.
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

// handle the GET request by processing the search query and pagination.
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1", 10);

    if (!query) {
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
