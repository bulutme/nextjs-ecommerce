type InventorySizes = Record<string, number>;

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  sku: string;
  inventory: any;
};

export interface ProductsData {
  products: Product[];
}

export type ProductItemProps = Omit<Product, "inventory" | "sku" | "category">;

export interface CartItemProps {
  brand: string;
  products: {
    product: ProductItemProps;
    count: number;
  }[];
}
