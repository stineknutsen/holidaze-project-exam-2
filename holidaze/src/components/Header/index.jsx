import React, { useContext } from "react";
import { styled } from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.colors.secondary};
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
  font-family: ${(props) => props.theme.fonts.links};
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  @media (min-width: 600px) {
    height: 45px;
    width: 45px;
  }

  @media (min-width: 900px) {
    height: 60px;
    width: 60px;
  }
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${(props) => props.theme.fonts.links};
`;

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <HeaderContainer>
      {user ? (
        <HeaderDiv>
          <Link to="/">
            <Logo src="src/assets/logo.png" alt="logo" />
          </Link>
          <UserDiv>
            <p>{user?.name ?? "Loading..."}</p>
            <Link to="/profile">
              {user?.avatar && (
                <UserImage src={user.avatar.url} alt={user.avatar.alt} />
              )}
            </Link>
          </UserDiv>
        </HeaderDiv>
      ) : (
        <HeaderDiv>
          <Link to="/">
            <Logo src="src/assets/logo.png" alt="logo" />
          </Link>
          <LinksDiv>
            <Link to="/register">Register</Link>
            <Link to="/login">
              <Button $variant="secondary">Login</Button>
            </Link>
          </LinksDiv>
        </HeaderDiv>
      )}
    </HeaderContainer>
  );
};

export default Header;
