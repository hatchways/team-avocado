import React from "react";
import styled from "styled-components";

import priceHelpers from "../helpers/priceHelpers";

import useResource from "../hooks/useResource";
import Button from "./Button";
import { colors, layout } from "../themes/theme";
import OrderItem from "./OrderItem";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;

  max-width: 300px;
  margin: 40px auto;
  background: white;
  box-shadow: 1px 7px 20px #33333314;

  h2 {
    text-align: center;
    padding: ${layout.spacing(2)} 0px;
    margin: 0px;
    font-weight: normal;
  }

  ul {
    list-style: none;
    padding: 0px 25px;
    max-height: 40vh;
    overflow-y: auto;
  }

  .order-item {
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1rem;

    img {
      width: 50px;
      height: 50px;
    }

    div {
      padding: 10px;
      flex-grow: 1;
    }

    h1 {
      margin: 5px 0px;
      font-size: 1.3rem;
      padding: 0px;
      text-align: left;
    }
    p {
      display: flex;
      margin: 0px;
      justify-content: space-between;
    }
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-sizing: content-box;
    background-color: black;
  }

  button {
    width: 100%;
    height: 75px;
  }

  #arrival-container {
    display: flex;
    justify-content: space-between;
    padding: ${layout.spacing(2)} ${layout.spacing(3)};
    font-size: 0.8rem;
    span:nth-of-type(1) {
      font-weight: bold;
    }
    span:nth-of-type(2) {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  #total-container {
    display: flex;
    justify-content: space-between;
    padding: ${layout.spacing(2)} ${layout.spacing(3)};
    border-top: 1px solid ${colors.faint};
  }

  #total-label {
    font-size: 1rem;
    font-weight: bold;
  }
  #total {
    font-weight: bold;
    color: ${colors.brand};
  }
`;


const OrderDetails = ({ items, price, arrivalTime, onSubmit }) => {
  const orderItems = items.map(item => <OrderItem {...item} />);

  console.dir(items);
  return (
    <Container>
      <h2>Your Order</h2>

      <span>{console.dir(items)}</span>

      <ul>{orderItems}</ul>
      <div id="arrival-container">
        <span>Arrival Time:</span>
        <span>{getArrivalTimeString(arrivalTime)}</span>
      </div>
      <div id="total-container">
        <span id="total-label">Total</span>
        <span id="total">${price}</span>
      </div>
      <Button onClick={onSubmit}>Checkout</Button>
    </Container>
  );
};

export default OrderDetails;

function getArrivalTimeString(date) {
  date = new Date(date);

  const split = date.toDateString().split(" ");

  const [time, amOrPm] = date.toLocaleTimeString().split(" ");

  return `${split[1]} ${split[2]} at ${time.slice(
    0,
    -3
  )}${amOrPm.toLowerCase()}`;
}
