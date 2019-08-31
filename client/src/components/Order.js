import React from "react";
import styled from "styled-components";
import { colors } from "../themes/theme";

import Button from "./Button";
import { FiEdit } from "react-icons/fi";
import { makeStyles } from "@material-ui/core/styles";



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
  }
});

const Order = ({ order }) => {
  const classes = useStyles();

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <div>        
          <h3>Order ID:</h3>
          <span>{order._id}</span>
        </div>
        <div>
          <h3>Order Status:</h3>
          <span>{order.status}</span>
        </div>
        <div>
          <h3>Ordered Date:</h3>
          <span>{order.createdAt}</span>
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <h3>Customer</h3>
          <span>{order.customer_name}</span>
          <h3>Chef:</h3>
          <span>{order.chef_name}</span>
        </div>
        <div>
          <ul>
            <li>dish</li>
            <li>dish</li>
            <li>dish</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;
