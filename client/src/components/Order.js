import React from "react";
import styled from "styled-components";
import { colors } from "../themes/theme";

import Button from "./Button";
import { FiEdit } from "react-icons/fi";

const Container = styled.div`
  width: 80%;
  display: flex;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  padding: 40px;
  margin: 15px 0px;
`;



const Order = ({ order }) => {
  
  return (
    <Container>
      <div>
        <h1>Order</h1>
        {/* <h3>{order.customer}</h3> */}
        <h3>{order.chef}</h3>
      </div>
      <ul>
        <li>dish</li>
        <li>dish</li>
        <li>dish</li>
      </ul>
    </Container>
  );
};

export default Order;
