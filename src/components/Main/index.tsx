import { FetchProductsResponse } from "@/app/types/Product/types";
import InfinityScroll from "../InfinityScroll";
import { fetchProducts } from "@/app/action";

type MainProps = {
  searchParams: {
    query: string;
    page: string;
  };
};

const Main = async ({ searchParams: { query, page = "1" } }: MainProps) => {
  const response: FetchProductsResponse = await fetchProducts(
    Number(page),
    query
  );

  return (
    <InfinityScroll
      initialData={response?.data}
      search={query}
      hasNextPage={response?.hasNextPage}
      query={fetchProducts}
    />
  );
};

export default Main;
