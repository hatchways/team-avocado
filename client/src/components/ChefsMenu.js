import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DishCard from './DishCard';
import AddDishDialog from './AddDishDialog'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { callAPI } from "../helpers/api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../store/createContext";

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
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
  }



});





export default function Chefsmenu({user_id}) {
  
  const [dishes, setDishes] = React.useState([]); 
  
  //get chef's dishes    
  const endpoint = `chef/${user_id}`;

  useEffect(async () => {
    const chef= await callAPI({
        endpoint: endpoint,
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        });
        console.log('GETCHEF get:',chef.dishes);

        setDishes(chef.dishes);

    },[]);
      let dishCardComponent = dishes.map((dish,index) =>{
          return <DishCard setDishes={setDishes} currdishes={dishes} dish_id={dish._id} name={dish.name} serve={dish.numPeopleServed} price={dish.price} ingred={dish.ingredients} required={dish.requirements} dishImg={dish.dishImg} index={index}/>;
      });
  const classes = useStyles();
  return (
    <Grid className={classes.menu}>
        <div className={classes.titlediv}>
            <span className={classes.title}>Atsushi's Menu:</span>

        </div>
        <Switch>
            <Route path="/chef/:chef_id/edit">
              <div>
                <AddDishDialog setDishes={setDishes} dishes={dishes}/>
              </div>
            </Route>
        </Switch>
        <div className={classes.scroll}>
          {dishCardComponent}
        </div>
    </Grid>
  );
}



