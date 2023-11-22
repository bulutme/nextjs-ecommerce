"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  html, body, #__next {
    height: 100%;
  }

  a {
    text-decoration: none;
    width: fit-content;
  }

  ul {
    list-style-type: none
  }
`;

export default GlobalStyles;
