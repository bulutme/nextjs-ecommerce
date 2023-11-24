type InventorySizes = Record<string, number | undefined>;

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  sku: string;
  inventory: InventorySizes;
  [key: string]: any;
};

export type ProductItemProps = Omit<Product, "inventory" | "sku">;

export type FetchProductsResponse = {
  data: Product[];
  page: Number;
  hasNextPage: boolean;
};

export type FetchResponse<T> = {
  data: T[];
  page: Number;
  hasNextPage: boolean;
};

export type MustHaveId = {
  id: string | number;
};
