import React from "react";
import styled from "styled-components";

import priceHelpers from "../helpers/priceHelpers";
import Button from "./Button";
import { colors, layout } from "../themes/theme";

const Container = styled.div`
  max-width: 300px;
  margin: 40px auto;
  background: white;
  box-shadow: 1px 7px 20px #33333314;

  h1 {
    text-align: center;
    padding: ${layout.spacing(2)} 0px;
    margin: 0px;
  }

  ul {
    list-style: none;
    padding: 0px 25px;
  }

  li {
    font-size: 0.5rem;
    display: flex;
    margin-bottom: 5px;

    img {
      width: 50px;
      height: 50px;
    }

    div {
      width: 70%;
      padding: 5px 0px;
      flex-grow: 1;
    }

    h3,
    h2 {
      margin: 0px;
    }
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  button {
    width: 100%;
    height: 75px;
  }

  #arrival-container {
    display: flex;
    justify-content: space-between;
    padding: ${layout.spacing(2)} ${layout.spacing(3)};

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

function getArrivalTimeString(date) {
  const split = date.toDateString().split(" ");

  let hours = date.getHours();

  return `${split[1]} ${split[2]} at ${
    hours === 0 ? 12 : hours % 12
  }:${date.getMinutes()} ${hours < 12 ? "am" : "pm"}`;
}

const OrderItem = ({ imageURL, name, price }) => (
  <li>
    <img src={imageURL} alt="image of dish" />

    <div>
      <h3>{name}</h3>
      <h2>{priceHelpers.numToString(price)}</h2>
    </div>
  </li>
);

const OrderDetails = ({ items, arrivalTime }) => {
  const orderItems = items.map(item => <OrderItem {...item} />);

  const total = priceHelpers.numToString(
    items.reduce((accum, item) => {
      accum += item.price;
      return accum;
    }, 0)
  );

  return (
    <Container>
      <div>
        <h1>Your Order</h1>

        <ul>{orderItems}</ul>
        <div id="arrival-container">
          <span>Arrival Time:</span>
          <span>{getArrivalTimeString(arrivalTime)}</span>
        </div>
        <div id="total-container">
          <span id="total-label">Total</span>
          <span id="total">{total}</span>
        </div>
      </div>
      <Button>Checkout</Button>
    </Container>
  );
};

export default OrderDetails;
