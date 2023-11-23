import { ReactNode } from "react";
import Popup from "../Popup";
import CartItem from "./CartItem";
import styled from "styled-components";
import Button from "../Button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type CartPopupProps = {
  children: ReactNode;
};

const Container = styled.div`
  position: relative;
  padding-top: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h4`
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 12px;
  width: 100%;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 12px;
  overflow-y: scroll;
  max-height: 360px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  bottom: 0;
  position: sticky;
  background: white;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CartPopup = ({ children }: CartPopupProps) => {
  const { cart, totalItemCount } = useCart();
  const isPopupVisible = totalItemCount > 0;

  const content = cart.map((item, index) => (
    <CartItem key={index} brand={item.brand} products={item.products} />
  ));

  return (
    <Popup
      trigger={children}
      content={
        isPopupVisible && (
          <Container>
            <Title>My Cart ({totalItemCount} Products)</Title>
            <Content>{content}</Content>
            <ButtonContainer>
              <Link href="/cart">
                <Button
                  $fullwidth={true}
                  $variant="rounded"
                  size="small"
                  color="primary"
                >
                  Go to Cart
                </Button>
              </Link>
            </ButtonContainer>
          </Container>
        )
      }
    />
  );
};

export default CartPopup;
