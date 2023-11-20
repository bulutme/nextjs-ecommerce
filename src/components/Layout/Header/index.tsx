"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button";
import SearchInput from "@/components/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import Container from "@/components/Container";
import CartPopup from "@/components/Cart/CartPopup";

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

const Cart = styled.div`
  position: absolute;
  right: 32px;
  top: 40px;
  @media (min-width: ${({ theme }) => theme.screens.md}) {
    position: static;
  }
`;

const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <LogoLink href="/">
          <Image
            src={"/next.svg"}
            width={100}
            height={55}
            alt="BiSürpriz Logo"
            priority
          />
        </LogoLink>
        <SearchInput
          $fullwidth
          onSearch={(value) => {
            console.log(value);
          }}
        />
        <Cart>
          <CartPopup>
            <Link href="/cart">
              <Button
                icon={<MdOutlineShoppingCart />}
                type="button"
                size="small"
                $variant="link"
                iconSize={24}
              >
                My Cart
              </Button>
            </Link>
          </CartPopup>
        </Cart>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
