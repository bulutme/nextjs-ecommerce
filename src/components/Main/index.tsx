import { FetchResponse, Product } from "@/app/types/Product/types";
import InfinityScroll from "../InfinityScroll";
import { fetchProducts } from "@/app/action";

type MainProps = {
  searchParams: {
    query: string;
    page: string;
  };
};

const Main = async ({ searchParams: { query, page = "1" } }: MainProps) => {
  const response: FetchResponse<Product> = await fetchProducts(
    Number(page),
    query
  );

  return (
    <InfinityScroll
      initialItems={response?.data}
      search={query}
      hasNextPage={response?.hasNextPage}
      fetchItems={fetchProducts}
    />
  );
};

export default Main;
