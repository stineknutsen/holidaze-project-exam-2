import styled, { css } from "styled-components";

const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 24px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.2s ease, color 0.2s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
      default:
        return css`
          background-color: ${theme.colors.accent};
          color: ${theme.colors.background};

          &:hover {
            border-color: ${theme.colors.background};
          }
          &:focus {
            border-color: ${theme.colors.background};
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text};

          &:hover {
            border-color: ${theme.colors.text};
          }
          &:focus {
            border-color: ${theme.colors.text};
          }
        `;
    }
  }}
`;

export default Button;
