import styled from "styled-components";
import Button from "../../../../components/Button";
import { useCart } from "@/context/CartContext";
import { FC } from "react";

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    text-align: center;
  }
`;

const CartSummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 0;
  padding: 8px 12px;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
  }
`;

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  padding: 8px 0;
  margin-top: 1px;
`;

const PriceTitle = styled.span`
  font-size: 0.875rem;
`;

const Price = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

const TotalRow = styled(CartItemRow)`
  margin-top: 8px;
`;

const TotalPrice = styled(Price)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CartSummary: FC = () => {
  const { totalPrice } = useCart();

  return (
    <>
      <CartSummaryContainer>
        <SummaryTitle>Cart Summary</SummaryTitle>
        <CartItemsWrapper>
          <CartItemRow>
            <PriceTitle>Subtotal</PriceTitle>
            <Price>${totalPrice}</Price>
          </CartItemRow>
          <CartItemRow>
            <PriceTitle>Shipping</PriceTitle>
            <Price>Free</Price>
          </CartItemRow>
          <TotalRow>
            <PriceTitle>Total</PriceTitle>
            <TotalPrice>${totalPrice}</TotalPrice>
          </TotalRow>
        </CartItemsWrapper>
      </CartSummaryContainer>
      <Button $fullwidth={true} $variant="rounded" color="primary">
        Proceed to checkout
      </Button>
    </>
  );
};

export default CartSummary;
