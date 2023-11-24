import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";
import { ProductItemProps } from "@/app/types/Product/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { generateShortId } from "@/lib/utils";

type CartItem = {
  product: ProductItemProps;
  count: number;
};

type GroupedCart = {
  id: string;
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

  // function to set initial cart items from local storage
  const setInitialCartItems = () => {
    setIsLoading(true);
    setCart(JSON.parse(localStorage.getItem("cart") as string));
    setIsLoading(false);
  };

  useEffect(() => {
    // check if the code is running on the client side before setting initial cart items
    if (typeof window !== "undefined") {
      // don't set state in useEffect
      setInitialCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to add product to the cart
  const addToCart = (product: ProductItemProps) => {
    // check if a group exists with the products's brand
    const existingGroupIndex = cart.findIndex(
      (group) => group.brand === product.brand
    );

    if (existingGroupIndex !== -1) {
      const newCart = [...cart];

      const existingProductIndex = cart[existingGroupIndex].products.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        // if the product already exists in the cart, increase its count
        const cartId =
          newCart[existingGroupIndex].products[existingProductIndex].product.id;
        increaseCount(cartId);
      } else {
        // if the product doesn't exist in the cart, add it
        newCart[existingGroupIndex].products.push({
          product,
          count: 1,
        });
        setCart(newCart);
      }
    } else {
      // if the brand doesn't exist in the cart, create a new group
      setCart((prevCart) => [
        ...prevCart,
        {
          id: generateShortId(),
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

  // function to remove a product from the cart
  const removeProduct = (productId: number) => {
    const newCart = cart.map((group) => ({
      ...group,
      products: group.products.filter((item) => item.product.id !== productId),
    }));

    // Remove empty groups
    const updatedCart = newCart.filter((group) => group.products.length > 0);
    setCart(updatedCart);
  };

  // function to increase the count of a product in the cart
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

  // function to decrease the count of a product in the cart
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

  // calculate the total item count in the cart
  const totalItemCount = cart.reduce(
    (total, group) =>
      total +
      group.products.reduce((groupTotal, item) => groupTotal + item.count, 0),
    0
  );

  // calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (total, group) =>
      total +
      group.products.reduce(
        (groupTotal, item) => groupTotal + item.count * item.product.price,
        0
      ),
    0
  );

  // format the total price to a string with two decimal places
  const formattedTotalPrice = totalPrice.toFixed(2);

  // memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cart,
      totalItemCount,
      totalPrice: formattedTotalPrice,
      addToCart,
      removeProduct,
      increaseCount,
      decreaseCount,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, isLoading]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// custom hook to use the cart context
const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
