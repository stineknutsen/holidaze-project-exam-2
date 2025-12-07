import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  App {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  Main {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => props.theme.colors.text};
  }

  h1, h2, h3 {
    font-family: 'Poppins', sans-serif;
    color: ${(props) => props.theme.colors.text};
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
