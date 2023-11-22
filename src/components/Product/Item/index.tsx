import styled from "styled-components";
import Image from "next/image";
import { ProductItemProps } from "@/app/types/Product/types";
import Button from "@/components/Button";

const Description = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 8px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  opacity: 0;
  cursor: pointer;

  transition: all 0.3s ease;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    padding: 0 24px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  background-color: white;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};

    ${Description} {
      opacity: 1;
      pointer-events: auto;
    }
  }

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    flex-direction: column;
    gap: 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.screens.xs}) {
    width: 128px;
    height: 128px;
    min-width: 128px;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  flex: 1;
  flex-grow: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    font-size: 1.125rem;
    margin-top: 0.5rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Price = styled.span`
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 0.4rem;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  font-size: 0.7rem;
  margin-top: 0.5rem;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    font-size: 1rem;
    width: 100%;
    margin-top: 0.8rem;
  }
`;

const ProductItem: React.FC<ProductItemProps> = ({
  price,
  image,
  description,
  name,
  id,
}) => {
  return (
    <ProductContainer key={id}>
      <ImageContainer>
        <StyledImage src={image} alt="Description" width={500} height={300} />
        <Description>{description}</Description>
      </ImageContainer>
      <Content>
        <ProductName>{name}</ProductName>
        <PriceContainer>
          <Price>${price}</Price>
          <Button size="small" color="primary" $variant="rounded">
            Sepete Ekle
          </Button>
        </PriceContainer>
      </Content>
    </ProductContainer>
  );
};

export default ProductItem;
