import styled, { createGlobalStyle } from "styled-components";

import { device } from "./Devices";

const GlobalStyle = createGlobalStyle`
:root {

  --box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  --box-shadow-medium: 0 10px 20px rgba(0, 0, 0, 0.1);


  --color-background-dark: #0F0D37;
  --color-text-dark: #FAFAFA;
  

  --primary-heading-size: 4rem;

  --secondary-heading-size: 2.7rem;

  /* --default-font-size: 1.5rem; */
  --default-font-size-xl: 2.4rem;
  --default-font-size-large: 2rem;
  --default-font-size-reg: 1.9rem;
  --default-font-size-medium: 1.7rem;
  --default-font-size-small: 1.4rem;
  --default-font-size-xsmall: 1.2rem;

  --default-paragraph-size: 1.8rem;
}

* {
  margin: 0;
  padding: 0;
}

*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;

  @media ${device.bigDesktop} {
    font-size: 75%;
  }

  @media ${device.tabLand} {
    font-size: 58.25%;
  }

  @media ${device.tabPort} {
    font-size: 51%;
  }

  
}

body {
  box-sizing: border-box;
  padding: 0rem;
  font-weight: 400;
  /* font-family: "Poppins", sans-serif; */
  font-family: "Nunito", sans-serif;
  /* text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  line-height: 1.7;
  color: ${({ theme }) =>
    theme.fonts.primaryText}; /*var(--color-primary-text);*/

background-color: ${({ theme }) =>
  theme.isDark
    ? theme.backgrounds.primary
    : theme.backgrounds.secondary}; /*var(--color-background);*/
}
`;

export default GlobalStyle;
