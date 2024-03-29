export const theme = {
  colors: {
    black: "#000",
    white: "#fff",
    gray: "#808080",
    grayLight: "#d3d3d3",
    border: "#e2e8f0",
    primary: "#3bb77e",
    primaryDark: "#2b8a5e",
    error: "#dc2626",
    info: "#0891b2",
    success: "#16a34a",
  },
  screens: {
    "2xs": "400px",
    xs: "480px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1440px",
    "3xl": "1560px",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export type Theme = typeof theme;
