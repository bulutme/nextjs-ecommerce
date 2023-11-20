import { Providers } from "@/app/providers";
import React from "react";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
};

export default MainLayout;
