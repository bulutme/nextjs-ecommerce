import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../../../../components/Button";
import Link from "next/link";

const EmptyCartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    flex-direction: row;
    gap: 0;
  }
`;

const CartIconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 2rem;
  text-align: center;
  padding: 0 1.25rem;
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
`;

const CartText = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-left: 0.625rem;
`;

const EmptyCart = () => {
  return (
    <EmptyCartContainer>
      <CartIconWrapper>
        <CartIcon />
        <CartText>No products in the cart</CartText>
      </CartIconWrapper>
      <Link href="/">
        <Button size="large" $variant="rounded" color="primary">
          Start Shopping
        </Button>
      </Link>
    </EmptyCartContainer>
  );
};

export default EmptyCart;
