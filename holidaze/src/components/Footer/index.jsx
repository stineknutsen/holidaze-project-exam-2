import React from "react";
import { styled } from "styled-components";
import { theme } from "../../theme";

const FooterContainer = styled.footer`
  background-color: ${theme.colors.secondary};
  padding: 1rem;
`;

const FooterDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Logo = styled.img`
  height: 30px;

  @media (min-width: 600px) {
    height: 45px;
  }
`;

const LinksDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterDiv>
        <Logo src="src/assets/logo.png" alt="logo" />
        <LinksDiv>
          <h3>Company</h3>
          <p>About Holidaze</p>
          <p>Privacy Policy</p>
          <p>Terms of service</p>
        </LinksDiv>
        <LinksDiv>
          <h3>Follow us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
        </LinksDiv>
        <LinksDiv>
          <h3>Support</h3>
          <p>Contact us</p>
          <p>FAQ</p>
        </LinksDiv>
      </FooterDiv>
    </FooterContainer>
  );
}
