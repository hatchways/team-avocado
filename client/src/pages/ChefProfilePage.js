import React from "react";
import styled from "styled-components";


import Navbar from "../components/Navbar";
import NameCard from "../components/ChefNameCard";
import SimpleMenu from "../components/MenuButton";
import ChefsMenu from "../components/ChefsMenu";
import { layout } from "../themes/theme";


const PageContainer = styled.div`
  display: flex;
  align-items: stretch;
  height:100vh;

  .paneLeft {
    position:relative;
    top:12%;
    width: 24%; 
    height:88%;
    display: flex;
    flex-direction:column;
  }

  .paneRight {
    position:relative;
    top:12%;
    width: 76%; 
    height:88%;
    display: flex;
    flex-direction:column;
    align-items: center;
  }

  nav span {
    margin-right: ${layout.spacing(4)};
    
  }

`;

function ChefPage(props) {
  console.log(props);
  console.log(props.match.params.chef_id);
  const chef_id=props.match.params.chef_id;
  return (
    <PageContainer className="pageContainer">

      <Navbar>
        <SimpleMenu></SimpleMenu>
      </Navbar>

      <div className="paneLeft">
        <NameCard user_id={chef_id}/>
      </div>
      <div className="paneRight">
        <ChefsMenu/>
      </div>
    </PageContainer>
  );
}

export default ChefPage;
