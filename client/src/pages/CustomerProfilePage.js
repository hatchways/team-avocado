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

function CustomerPage(props) {
  const customer_id=props.match.params.customer_id;

  return (
    <PageContainer>
      <Navbar>
        <SimpleMenu />
      </Navbar>

      <NameCard user_id={customer_id}/>
    </PageContainer>
  );
}

export default CustomerPage;
