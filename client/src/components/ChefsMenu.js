import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DishCard from './DishCard';
// import Typography from '@material-ui/core/Typography';
import AddDishDialog from './AddDishDialog'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

const useStyles = makeStyles({

  

  menu:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    background:"#f8f8fe",
    justifyContent:"space-between",
    height:"100%",
    width:"100%",
    fontFamily: "Montserrat",

  },

  scroll:{
    width:"80%",
    height:"83%",
    overflowY:"scroll",

  },

  titlediv:{
    padding:10
  }



});





export default function Chefsmenu() {
  const classes = useStyles();
  return (
    <Grid className={classes.menu}>
        <div className={classes.titlediv}>
            <span className={classes.title}>Atsushi's Menu:</span>

        </div>
        <Switch>
            <Route path="/chef/edit/:chef_id">
              <div>
                <AddDishDialog/>
              </div>
            </Route>
        </Switch>
        <div className={classes.scroll}>

            <DishCard/>
            <DishCard/>
            
        </div>
    </Grid>
  );
}



