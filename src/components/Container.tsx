"use client";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const StyledContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 0.625rem;
  padding-right: 0.625rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    width: 750px;
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    width: 960px;
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    width: 1100px;
  }

  @media (min-width: ${({ theme }) => theme.screens["2xl"]}) {
    width: 1350px;
  }
`;

const Container = ({ children }: Props) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
