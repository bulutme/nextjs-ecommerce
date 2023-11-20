type InventorySizes = Record<string, number>;

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  sku: string;
  inventory: InventorySizes;
};

export type CartItemProps = Pick<
  Product,
  "name" | "id" | "description" | "price" | "image" | "brand"
>;

export type ProductItemProps = Omit<CartItemProps, "brand">;
