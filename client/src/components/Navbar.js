import React, { useContext } from "react";
import styled from "styled-components";

import AuthContext from "../store/createContext";
import { layout, colors } from "../themes/theme";
const { spacing, navHeight } = layout;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${navHeight};
  padding: 15px ${spacing(4)};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;

  background-color: ${({ transparent }) =>
    transparent ? "transparent" : "white"};
  box-shadow: ${({ transparent }) =>
    transparent ? "none" : `1px 7px 20px ${colors.bgcolor}`};

  img {
    width: 200px;
    height: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export default function Navbar({ children, transparent }) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Container transparent={transparent}>
      <img src="/logo.png" alt="logo" />
      <div>{children}</div>
    </Container>
  );
}
