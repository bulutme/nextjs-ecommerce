import { ReactNode } from "react";
import Popup from "../../../../components/Popup";
import CartItem from "./CartItem";
import styled from "styled-components";
import Button from "../../../../components/Button";
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
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 12px;
  overflow-y: scroll;
  max-height: 360px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  bottom: 0;
  position: sticky;
  background: ${({ theme }) => theme.colors.white};
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CartPopup = ({ children }: CartPopupProps) => {
  const { cart, totalItemCount } = useCart();
  const isPopupVisible = totalItemCount > 0;

  const content = cart.map((item) => (
    <CartItem key={item.id} brand={item.brand} products={item.products} />
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