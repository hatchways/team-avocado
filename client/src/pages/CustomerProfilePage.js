import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import NameCard from "../components/CustomerNameCard";
import SimpleMenu from "../components/MenuButton";
import { layout } from "../themes/theme";

const PageContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  .paneLeft {
    position: relative;
    top: 12%;
    width: 24%;
    height: 88%;
    display: flex;
    flex-direction: column;
  }

  .paneRight {
    position: relative;
    top: 12%;
    width: 76%;
    height: 88%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav span {
    margin-right: ${layout.spacing(4)};
  }
`;

function ChefPage() {
  return (
    <PageContainer>
      <Navbar>
        <SimpleMenu />
      </Navbar>

      <NameCard />
    </PageContainer>
  );
}

export default ChefPage;
