import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import NameCard from "../components/ChefNameCard";
import SimpleMenu from "../components/MenuButton";
import ChefsMenu from "../components/ChefsMenu";
import { layout } from "../themes/theme";
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

function ChefPage({ chefId }) {
  const [chef] = useResource(`chef/${chefId}`);

  console.log(chef);

  return (
    <PageContainer className="pageContainer">
      <Navbar>
        <SimpleMenu />
      </Navbar>

      <div className="paneLeft">
        {!chef ? "Loading..." : <NameCard chef={chef} />}
      </div>
      <div className="paneRight">{!chef ? "Loading..." : <ChefsMenu />}</div>
    </PageContainer>
  );
}

export default ChefPage;
