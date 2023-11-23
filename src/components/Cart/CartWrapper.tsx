import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import Button from "../Button";
import { useCart } from "@/context/CartContext";
import EmptyCart from "./EmptyCart";

const CartContainer = styled.div`
  width: 100%;
  position: relative;
`;

const CartTitle = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const CartContent = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CartItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-column: span 2;
  }
`;

const CartSummaryWrapper = styled.div`
  background-color: white;
  width: 100%;
  position: sticky;
  height: fit-content;
  padding: 1rem;
  bottom: 0;
  top: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-column: span 1;
    padding: 0;
  }
`;

const CartWrapper = () => {
  const { cart, totalItemCount } = useCart();

  return (
    <CartContainer>
      {cart && cart.length > 0 ? (
        <>
          <CartTitle>My Cart ({totalItemCount} Products)</CartTitle>
          <CartContent>
            <CartItemsWrapper>
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  brand={item.brand}
                  products={item.products}
                />
              ))}
              <Link href="/">
                <Button
                  icon={<AiOutlineArrowLeft />}
                  size="small"
                  $variant="link"
                >
                  Proceed Shopping
                </Button>
              </Link>
            </CartItemsWrapper>
            <CartSummaryWrapper>
              <CartSummary />
            </CartSummaryWrapper>
          </CartContent>
        </>
      ) : (
        <EmptyCart />
      )}
    </CartContainer>
  );
};

export default CartWrapper;
