import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import NameCard from "../components/ChefNameCard";
import SimpleMenu from "../components/MenuButton";
import ChefDashboard from "../components/Menu/ChefDashboard";
import ReadOnlyMenu from "../components/Menu/ReadOnlyMenu";
import { layout } from "../themes/theme";
import { useContext } from "react";
import AuthContext from "../store/createContext";
import useResource from "../hooks/useResource";

const PageContainer = styled.div`
  display: flex;
  align-items: stretch;
  max-height: 100vh;

  .pane {
    height: calc(100vh - ${layout.navHeight});
    margin-top: ${layout.navHeight};
  }

  .paneLeft {
    display: flex;
    flex-direction: column;
    width: 25%;

    z-index: 10;
  }

  .paneRight {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav span {
    margin-right: ${layout.spacing(4)};
  }
`;

function ChefPage({ chefId }) {
  // Determine whether logged in user owns this
  // profile page
  const { user } = useContext(AuthContext),
    userIsOwner = user && user.id === chefId;

  // Get the ID'd Chef document from API
  const [chef] = useResource(`chef/${chefId}`);

  return (
    <PageContainer className="pageContainer">
      <Navbar>
        <SimpleMenu />
      </Navbar>

      {!chef ? (
        "Loading..."
      ) : (
        <>
          <div className="pane paneLeft">
            <NameCard chef={chef} userIsOwner={userIsOwner} />
          </div>
          <div className="pane paneRight">
            {userIsOwner ? (
              <ChefDashboard chef={chef} />
            ) : (
              <ReadOnlyMenu chef={chef} />
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
}

export default ChefPage;
