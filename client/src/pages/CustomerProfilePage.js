import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import NameCard from "../components/CustomerNameCard";
import SimpleMenu from "../components/MenuButton";
import { layout, colors } from "../themes/theme";
import { useContext } from "react";
import AuthContext from "../store/createContext";
import useResource from "../hooks/useResource";

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
  // Determine whether logged in user owns this
  // profile page
  const { user } = useContext(AuthContext),
    userIsOwner = user && user.id === customerId;

  // Get the ID'd Customer document from API
  const [customer] = useResource(`customer/${customerId}`, user.token);

  return (
    <PageContainer>
      <Navbar>
        <SimpleMenu />
      </Navbar>

      <NameCard customer={customer} />
    </PageContainer>
  );
}

export default CustomerPage;
