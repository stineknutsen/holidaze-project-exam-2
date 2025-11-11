import React from "react";
import { styled } from "styled-components";
import { theme } from "../../theme";

const FooterContainer = styled.footer`
  background-color: ${theme.colors.secondary};
  padding: 1rem;
`;
export default function Footer() {
  return (
    <FooterContainer>
      <p>Footer</p>
    </FooterContainer>
  );
}
