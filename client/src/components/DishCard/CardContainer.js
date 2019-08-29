import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 80%;
  position: relative;
  display: flex;
  padding: 40px;
  justify-content: space-between;
  background-color: white;
  /* box-shadow: 0px 30px 90px -20px rgba(0, 0, 0, 0.3),
    0px 1px 1px rgba(0, 0, 0, 0.05); */

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);

  img {
    height: 300px;
    width: 300px;
  }
`;

export default CardContainer;
