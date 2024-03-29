import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { ProductItemProps } from "@/app/types/Product/types";
import { useCart } from "@/context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ToastType, useToast } from "@/context/ToastContext";

export interface CartItemProps {
  brand: string;
  products: {
    product: Omit<ProductItemProps, "category">;
    count: number;
  }[];
}

const sharedStyles = css`
  display: flex;
  align-items: center;
`;

const CartItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const CartItemListItem = styled.li`
  ${sharedStyles}
  position: relative;
  padding: 12px 0 24px;
`;

const ProductName = styled.p`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ProductBrand = styled(ProductName)`
  color: ${({ theme }) => theme.colors.info};
  margin-bottom: 0.6rem;
`;

const ProductImage = styled(Image)`
  object-fit: cover;
  aspect-ratio: 1 / 1;
  cursor: pointer;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  font-normal;
  font-size: 0.875rem;
  margin-left: 1rem;
`;

// it shows in just two lines
const Description = styled.p`
  font-size: 1rem;
  color: rgb(31 41 55);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
`;

const QuantityWrapper = styled.div`
  ${sharedStyles}
  gap: 8px;
  padding: 6px 0;
`;

const PriceAndQuantity = styled.div`
  ${sharedStyles}
  justify-content: space-between;
`;

const Quantity = styled.span`
  width: 12px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  width: 28px;
  height: 28px;
  top: -10px;
  right: 0;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    background: rgb(243 244 246);
  }
`;

const StyledButton = styled.button`
  ${sharedStyles}
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.grayLight};
    cursor: not-allowed;
  }
`;

const CartItem: React.FC<CartItemProps> = ({ brand, products }) => {
  const { removeProduct, increaseCount, decreaseCount } = useCart();
  const { addToast } = useToast();

  const showToast = (type: ToastType, message: string) => {
    addToast(type, message);
  };

  const handleDecreaseCount = (id: number, name: string) => {
    decreaseCount(id);
    showToast("success", `${name}'s quantity decreased`);
  };

  const handleIncreaseCount = (id: number, name: string) => {
    increaseCount(id);
    showToast("success", `${name}'s quantity increased`);
  };

  const handleRemoveProduct = (id: number, name: string) => {
    removeProduct(id);
    showToast("success", `${name} deleted from cart`);
  };

  return (
    <CartItemContainer>
      <ul>
        <Link href="#">
          <ProductBrand>{brand}</ProductBrand>
        </Link>
        {products?.map((item) => {
          return (
            <CartItemListItem key={item.product.id}>
              <ProductImage
                src={item.product.image}
                alt={item.product.name}
                width={100}
                height={100}
                priority
              />
              <ProductDetails>
                <div>
                  <ProductName>{item.product.name}</ProductName>
                  <Description>{item.product.description}</Description>
                </div>
                <PriceAndQuantity>
                  <Price>${item.product.price}</Price>
                  <QuantityWrapper>
                    <StyledButton
                      data-testid="decrease-button"
                      disabled={item.count <= 1}
                      onClick={() =>
                        handleDecreaseCount(item.product.id, item.product.name)
                      }
                    >
                      <FaMinus />
                    </StyledButton>
                    <Quantity>{item.count}</Quantity>
                    <StyledButton
                      data-testid="increase-button"
                      onClick={() =>
                        handleIncreaseCount(item.product.id, item.product.name)
                      }
                    >
                      <FaPlus />
                    </StyledButton>
                  </QuantityWrapper>
                </PriceAndQuantity>
              </ProductDetails>
              <CloseIcon
                data-testid="remove-button"
                onClick={() =>
                  handleRemoveProduct(item.product.id, item.product.name)
                }
              />
            </CartItemListItem>
          );
        })}
      </ul>
    </CartItemContainer>
  );
};

export default CartItem;
