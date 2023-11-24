import { FC, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button";
import SearchInput from "@/components/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import Container from "@/components/Container";
import CartPopup from "@/app/cart/components/Cart/CartPopup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { AiOutlineArrowLeft } from "react-icons/ai";

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  max-height: auto;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    padding: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    justify-content: space-around;
    gap: 7%;
    align-items: center;
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Cart = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 200px;
  right: 32px;
  top: 18px;
  height: 40px;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    position: static;
  }
`;

const Badge = styled.span<{ $showBadge: boolean }>`
  position: absolute;
  top: 0;
  right: -10px;
  background-color: ${({ theme }) => theme.colors.error};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 22px;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: ${({ $showBadge }) => ($showBadge ? "block" : "none")};
`;

const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItemCount } = useCart();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChangeSearch = (value: string) => {
    router.push(
      value ? `/?${createQueryString("query", value)}` : pathname + ""
    );
  };

  const isCartVisible = pathname !== "/cart";

  return (
    <Container>
      <HeaderContainer>
        <Link href="/">
          <Image
            src={"/next.svg"}
            width={100}
            height={55}
            alt="next logo"
            priority
          />
        </Link>
        <SearchInput
          initialValue={searchParams.get("query")!}
          $fullwidth
          onSearch={(value) => handleChangeSearch(value)}
        />
        <Cart>
          {isCartVisible ? (
            <CartPopup>
              <Link href="/cart">
                <ButtonWrapper>
                  <Button
                    icon={<MdOutlineShoppingCart />}
                    type="button"
                    size="small"
                    $variant="link"
                    iconSize={24}
                  >
                    My Cart
                  </Button>
                  <Badge $showBadge={totalItemCount > 0}>
                    {totalItemCount}
                  </Badge>
                </ButtonWrapper>
              </Link>
            </CartPopup>
          ) : (
            <ButtonWrapper>
              <Link href="/">
                <Button
                  icon={<AiOutlineArrowLeft />}
                  size="small"
                  $variant="link"
                >
                  Proceed Shopping
                </Button>
              </Link>
            </ButtonWrapper>
          )}
        </Cart>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
