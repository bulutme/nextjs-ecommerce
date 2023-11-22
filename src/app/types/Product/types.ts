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

export type CartItemProps = Pick<
  Product,
  "name" | "id" | "description" | "price" | "image" | "brand"
>;

export type ProductItemProps = Omit<CartItemProps, "brand">;
