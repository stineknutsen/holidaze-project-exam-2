import React from "react";
import { styled } from "styled-components";
import { theme } from "../../theme";
import Button from "../Button";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: ${theme.colors.secondary};
  padding: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 30px;

  @media (min-width: 600px) {
    height: 45px;
  }

  @media (min-width: 900px) {
    height: 60px;
  }
`;

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: "Poppins", sans-serif;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderDiv>
        <Link to="/">
          <Logo src="src/assets/logo.png" alt="logo" />
        </Link>
        <LinksDiv>
          <Link to="/register">Register</Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </LinksDiv>
      </HeaderDiv>
    </HeaderContainer>
  );
}
