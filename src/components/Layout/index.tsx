"use client";

import { Providers } from "@/app/providers";
import Header from "./Header";
import GlobalStyles from "@/styles/global";
import Container from "../Container";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <GlobalStyles />
      <Container>
        <Header />
        {children}
      </Container>
    </Providers>
  );
};

export default MainLayout;
