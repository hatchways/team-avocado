import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles({
  card: {
    minWidth: "70%",
    minHeight:"43%",
    display:'flex',

  },

  image:{
    padding:40,
  },

  info:{
    display: 'flex',
    flexDirection:"column",
    padding:40,
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <Grid className={classes.info}>
            <span id="pplnum"> MEAL FOR 2</span>
            <span id="dishname"> 4 specialty rolls </span>
            <span id="price"> $15.00 </span>
            <span id="upperbig">INGREDIENTS</span>
            <p id="greysmall">Rice, nori, avacado, crab, cucumber, wasabi, rice vinegar, soy sauce, salt, sugar.</p>
            <span id="upperbig">REQUIRED STUFF</span>
            <p id="greysmall">Kitchen Table, Cooking plate</p>
        </Grid>

        <Grid className={classes.image}>
            <img className="dishpic" alt="dish" src="/img-sushi.png" />
        </Grid>
    </Card>
  );
}
