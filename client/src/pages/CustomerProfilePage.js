import React from "react";
import styled from "styled-components";

import useResource from "../hooks/useResource";
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

function CustomerPage({ customerId }) {
  // get id param from props passed by <Route>

  const [customer] = useResource(`customer/${customerId}`);

  return (
    <PageContainer>
      <Navbar>
        <SimpleMenu />
      </Navbar>
      {console.log(customerId)}
      {customer ? <NameCard customer={customer} /> : "Loading"}
    </PageContainer>
  );
}

export default CustomerPage;
