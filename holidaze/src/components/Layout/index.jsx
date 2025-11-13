import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";

const Layoutwrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export default function Layout() {
  return (
    <Layoutwrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Layoutwrapper>
  );
}
