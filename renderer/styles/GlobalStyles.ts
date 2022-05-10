import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ${reset}

  body {
    min-height: 100vh;
  }

  button {
    background-color: transparent;
    border: none;
  }
`;

export default GlobalStyle;
