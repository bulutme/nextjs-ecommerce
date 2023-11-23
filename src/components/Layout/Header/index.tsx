import { useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button";
import SearchInput from "@/components/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import Container from "@/components/Container";
import CartPopup from "@/components/Cart/CartPopup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

const LogoLink = styled.a`
  display: block;
  width: 200px;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    margin-bottom: 0;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 8px;
  max-height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    justify-content: space-between;
    gap: 7%;
    align-items: center;
    flex-direction: row;
    margin-bottom: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Cart = styled.div`
  position: absolute;
  right: 32px;
  top: 40px;
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

const Header = () => {
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

  const isCartVisible = pathname !== "/cart";

  return (
    <Container>
      <HeaderContainer>
        <LogoLink href="/">
          <Image
            src={"/next.svg"}
            width={100}
            height={55}
            alt="BiSürpriz Logo"
          />
        </LogoLink>
        <SearchInput
          initialValue={searchParams.get("query")!}
          $fullwidth
          onSearch={(value) => {
            router.push(
              value ? `/?${createQueryString("query", value)}` : pathname + ""
            );
          }}
        />
        {isCartVisible && (
          <Cart>
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
          </Cart>
        )}
      </HeaderContainer>
    </Container>
  );
};

export default Header;
