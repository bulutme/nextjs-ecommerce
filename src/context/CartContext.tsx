import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ProductItemProps } from "@/app/types/Product/types";
import useLocalStorage from "@/hooks/useLocalStorage";

type CartItem = {
  product: ProductItemProps;
  count: number;
};

type GroupedCart = {
  brand: string;
  products: CartItem[];
};

type CartContextType = {
  cart: GroupedCart[];
  addToCart: (product: ProductItemProps) => void;
  removeProduct: (productId: number) => void;
  increaseCount: (productId: number) => void;
  decreaseCount: (productId: number) => void;
  totalItemCount: number;
  totalPrice: string;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage<GroupedCart[]>("cart", []);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      setCart(JSON.parse(localStorage.getItem("cart") as string));
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalItemCount = cart.reduce(
    (total, group) =>
      total +
      group.products.reduce((groupTotal, item) => groupTotal + item.count, 0),
    0
  );

  const totalPrice = cart.reduce(
    (total, group) =>
      total +
      group.products.reduce(
        (groupTotal, item) => groupTotal + item.count * item.product.price,
        0
      ),
    0
  );

  const formattedTotalPrice = totalPrice.toFixed(2);

  const addToCart = (product: ProductItemProps) => {
    const existingGroupIndex = cart.findIndex(
      (group) => group.brand === product.brand
    );

    if (existingGroupIndex !== -1) {
      const existingProductIndex = cart[existingGroupIndex].products.findIndex(
        (item) => item.product.id === product.id
      );

      const newCart = [...cart];

      if (existingProductIndex !== -1) {
        const cartId =
          newCart[existingGroupIndex].products[existingProductIndex].product.id;
        increaseCount(cartId);
      } else {
        newCart[existingGroupIndex].products.push({
          product,
          count: 1,
        });
        setCart(newCart);
      }
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          brand: product.brand,
          products: [
            {
              product,
              count: 1,
            },
          ],
        },
      ]);
    }
  };

  const removeProduct = (productId: number) => {
    const newCart = cart.map((group) => ({
      ...group,
      products: group.products.filter((item) => item.product.id !== productId),
    }));

    // Remove empty groups
    const updatedCart = newCart.filter((group) => group.products.length > 0);
    setCart(updatedCart);
  };

  const increaseCount = (productId: number) => {
    const newCart = cart.map((group) => {
      return {
        ...group,
        products: group.products.map((item) =>
          item.product.id === productId
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    });

    setCart(newCart);
  };

  const decreaseCount = (productId: number) => {
    const newCart = cart.map((group) => ({
      ...group,
      products: group.products.map((item) =>
        item.product.id === productId
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item
      ),
    }));

    setCart(newCart);
  };

  const contextValue: CartContextType = {
    cart,
    totalItemCount,
    totalPrice: formattedTotalPrice,
    addToCart,
    removeProduct,
    increaseCount,
    decreaseCount,
    isLoading,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
