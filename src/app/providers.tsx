"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import StyledComponentsRegistry from "@/lib/registry";

export function Providers({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
