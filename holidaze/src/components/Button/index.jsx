import styled, { css } from "styled-components";

const Button = styled.button`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 24px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  ${({ variant }) => {
    switch (variant) {
      case "primary":
      default:
        return css`
          background-color: ${(props) => props.theme.colors.accent};
          color: ${(props) => props.theme.colors.background};

          &:hover {
            border-color: ${(props) => props.theme.colors.background};
          }
          &:focus {
            border-color: ${(props) => props.theme.colors.background};
          }
        `;
      case "secondary":
        return css`
          background-color: ${(props) => props.theme.colors.primary};
          color: ${(props) => props.theme.colors.text};

          &:hover {
            border-color: ${(props) => props.theme.colors.text};
          }
          &:focus {
            border-color: ${(props) => props.theme.colors.text};
          }
        `;
    }
  }}
`;

export default Button;
