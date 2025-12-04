import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    text: "#181522",
    background: "#f8f8f8",
    primary: "#ede8ff",
    secondary: "#c4b5fd",
    tertiary: "#a78bfa",
    accent: "#6835ff",
    successBackground: "#c6fbe7",
    successBorder: "#4dffa6",
    errorBackground: "#ffcbcb",
    errorBorder: "#C54141",
  },
  fonts: {
    main: '"Open Sans", sans-serif',
    heading: '"Poppins", sans-serif',
    links: '"Poppins", sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSizes: {
    small: "0.875rem",
    base: "1rem",
    large: "1.5rem",
  },
};

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
