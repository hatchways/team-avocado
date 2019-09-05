import React from "react";
import styled from "styled-components";

import Button from "./Button";
import { FiEdit } from "react-icons/fi";
import { makeStyles } from "@material-ui/core/styles";
import OrderItem from "./OrderItem";
import { colors, layout } from "../themes/theme";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 15px 0px;

  h2 {
    margin: 0px;
    font-weight: bold;
    font-size: 1rem;
  }

  ul {
    list-style: none;
    padding: 0px 25px;
    max-height: 100px;
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

const useStyles = makeStyles({

  header:{
      height:"20%",
      display:"flex",
      justifyContent:"space-between"
  },
  Container:{
    width: "80%",
    display: "flex",
    flexDirection:"column",
    backgroundColor: "white",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
    padding: 20,
    margin: "15px 0px"
  },
  info:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
  },
});

const Order = ({ order }) => {
  const classes = useStyles();
  console.log("Order.js: order:",order);
  const orderItems = order.dishes.map(item => <OrderItem {...item} />);

  return (
    <Container>
      <div className={classes.header}>
        <div>        
          <h2>Order ID:</h2>
          <span>{order._id}</span>
        </div>
        <div>
          <h2>Order Status:</h2>
          <span>{order.status}</span>
        </div>
        <div>
          <h2>Ordered Date:</h2>
          <span>{getArrivalTimeString(order.createdAt)}</span>
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <h3>Customer</h3>
          {order.customer?(<span>{order.customer.name}</span>):("Loading...")}
        </div>
        <div>
          <h3>Reserved Time:</h3>
          <span>{getArrivalTimeString(order.bookedTime)}</span>
        </div>
        <div>
          <ul>
            {orderItems}
          </ul>
          <div id="total-container">
            <span id="total-label">Total</span>
            <span id="total">${order.price}</span>
          </div>
        </div>

      </div>
  </Container>

  );
};

export default Order;

function getArrivalTimeString(date) {
  date = new Date(date);

  const split = date.toDateString().split(" ");

  const [time, amOrPm] = date.toLocaleTimeString().split(" ");

  return `${split[1]} ${split[2]} at ${time.slice(
    0,
    -3
  )}${amOrPm.toLowerCase()}`;
}
