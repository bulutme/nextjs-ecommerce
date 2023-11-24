import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import StyledComponentsRegistry from "@/lib/registry";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Toaster from "@/components/Toast";

export function Providers({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Toaster />
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
