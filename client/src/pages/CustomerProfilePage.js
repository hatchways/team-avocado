import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Navbar from "../components/Navbar";
import NameCard from "../components/CustomerNameCard";
import SimpleMenu from "../components/MenuButton";
import { layout, colors } from "../themes/theme";
import { useContext } from "react";
import AuthContext from "../store/createContext";
import useResource from "../hooks/useResource";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: ${colors.background};

`;

function CustomerPage({ customerId }) {
  // Determine whether logged in user owns this
  // profile page
  const { user } = useContext(AuthContext),
    userIsOwner = user && user.id === customerId;

  // Get the ID'd Customer document from API
  const { resource: customer } = useResource(
    `customer/${customerId}`,
    user.token
  );

  return (
    <PageContainer>
      <Navbar>
        <Link to="/browse/chefs" style={{ marginRight: 10 }}>
          <Button outline style={{ borderRadius: 10 }}>
            Browse Chefs
          </Button>
        </Link>
        <SimpleMenu />
      </Navbar>
      <div className="name-card-container">
        {customer ? (
          <NameCard customer={customer} userIsOwner={userIsOwner} />
        ) : (
          "Loading..."
        )}
      </div>
    </PageContainer>
  );
}

export default CustomerPage;
