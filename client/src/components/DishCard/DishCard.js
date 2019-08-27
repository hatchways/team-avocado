import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { colors } from "../../themes/theme";

import CardContainer from "./CardContainer.js";
import Button from "../Button";
import { FiEdit } from "react-icons/fi";

const { brandLight, brand } = colors;

const EditButton = ({ onClick }) => (
  <Button
    outline
    onClick={onClick}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      height: "65px",
      width: "65px",
      padding: "0px",
      borderRadius: "50%",
      minWidth: "0px",
      boxShadow: `0px 0px 10px -5px ${brand}`
    }}
  >
    <FiEdit style={{ width: "30px", height: "30px" }} />
  </Button>
);

const useStyles = makeStyles(theme => ({
  image: {
    padding: 40
  },

  form: {
    width: "100%"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    padding: 40
  },

  pplnum: {
    backgroundColor: brandLight,
    color: "white",
    padding: "10px",
    display: "inline",
    justifyContent: "space-between"
  },
  textField: {
    fullWidth: "true"
  },
  input: {
    display: "none"
  },
  dishpic: {
    maxWidth: "400px",
    height: "400px",
    marginLeft: "40px"
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  price: {
    color: colors.brandLight
  },
  bigbold: {
    fontWeight: "bold"
  },
  grey: {
    color: "grey"
  }
}));

export default function DishCard({
  dishImg,
  name,
  numPeopleServed,
  price,
  requirements,
  ingredients,
  toggleEdit
}) {
  const classes = useStyles(brandLight);

  return (
    <CardContainer>
      <EditButton onClick={toggleEdit} />
      <div>
        <div>
          <span className={classes.pplnum}> MEAL FOR {numPeopleServed}</span>
        </div>
        <p className={classes.name}> {name} </p>
        <p className={classes.price}> ${price} </p>
        <h5 className={classes.bigbold}>INGREDIENTS</h5>
        <p className={classes.grey}>{ingredients.join(", ")}</p>
        <h5 className={classes.bigbold}>REQUIRED STUFF</h5>
        <p className={classes.grey}>{requirements.join(", ")}</p>
      </div>
      <img className={classes.dishpic} alt="dish" src={dishImg} />
    </CardContainer>
  );
}
