"use client";

import { Providers } from "@/app/providers";
import Header from "./Header";
import GlobalStyles from "@/styles/global";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <GlobalStyles />
      <Header />
      {children}
    </Providers>
  );
};

export default MainLayout;
