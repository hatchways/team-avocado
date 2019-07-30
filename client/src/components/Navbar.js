import React from "react";
import styled from "styled-components";

import { layout } from "../themes/theme";
const { spacing } = layout;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px ${spacing(4)};
  position: absolute;
  top: 0px;
  left: 0px;

  img {
    width: 200px;
    height: 20px;
  }
`;

export default function Navbar({ children }) {
  return (
    <Container>
      <img src="/logo.png" />
      <div>{children}</div>
    </Container>
  );
}
