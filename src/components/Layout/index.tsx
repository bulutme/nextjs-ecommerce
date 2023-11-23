"use client";

import { Providers } from "@/app/providers";
import Header from "./Header";
import GlobalStyles from "@/styles/global";
import Container from "../Container";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
