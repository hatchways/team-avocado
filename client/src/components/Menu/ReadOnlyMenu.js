import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DishCard from "../DishCard/DishCard";

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f8f8fe",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    fontFamily: "Montserrat"
  },

  scroll: {
    width: "80%",
    height: "83%",
    overflowY: "scroll"
  },

  titlediv: {
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default function ReadOnlyMenu({ chef }) {
  let dishCards = chef.dishes.map((dish, index) => {
    return <DishCard {...dish} key={dish._id} />;
  });

  const classes = useStyles();
  return (
    <Grid className={classes.menu}>
      <div className={classes.titlediv}>
        <span className={classes.title}>{chef.name}'s Menu:</span>
      </div>
      <div className={classes.scroll}>{dishCards}</div>
    </Grid>
  );
}
