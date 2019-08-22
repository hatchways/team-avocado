import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { colors } from "../../themes/theme";

const { brandLight } = colors;

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "70%",
    minHeight: "43%",
    margin: 5
  },

  image: {
    padding: 40
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    cursor: "pointer"
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
  ingredients
}) {
  const classes = useStyles(brandLight);

  console.log(ingredients);
  return (
    <Card className={classes.card}>
      <div className={classes.form}>
        <Grid className={classes.info}>
          <div>
            <span className={classes.pplnum}> MEAL FOR {numPeopleServed}</span>
          </div>
          <p className={classes.name}> {name} </p>
          <span className={classes.price}> ${price} </span>
          <span className={classes.bigbold}>INGREDIENTS</span>
          <p className={classes.grey}>{ingredients.join(", ")}</p>
          <span className={classes.bigbold}>REQUIRED STUFF</span>
          <p className={classes.grey}>{requirements.join(", ")}</p>
        </Grid>

        <Grid className={classes.image}>
          <img className="dishpic" alt="dish" src={dishImg} />
        </Grid>
      </div>
    </Card>
  );
}
