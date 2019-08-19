import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import { colors } from "../themes/theme";
import Tooltip from '@material-ui/core/Tooltip';
import { callAPI } from "../helpers/api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../store/createContext";



const { brand, brandLight } = colors;
const SaveButton = styled(Button)`
  min-width: 100px;
`;
const useStyles = makeStyles(theme =>({
  card: {
    minWidth: "70%",
    minHeight:"43%",
    margin:5,
  },

  image:{
    padding:40,
  },

  form:{
    width:"100%",
    display: 'flex',
    flexDirection:"row",
    justifyContent:"space-between",
  },
  info:{
    display: 'flex',
    flexDirection:"column",
    padding:40,
  },

  pplnum:{
    backgroundColor: brandLight,
    color:"white",
    padding:"10px",
    display:"inline",
    justifyContent: "space-between",
  },
  textField:{
    fullWidth:"true",
  },
  input:{
    display:"none",
  },
  dishpic:{
    cursor:"pointer",
  },
  name:{
    fontWeight: "bold",
    fontSize: 20,
  },
  price:{
    color:colors.brandLight,
  },
  bigbold:{
    fontWeight:"bold",
  },
  grey:{
    color:"grey"
  }


}));

export default function SimpleCard({dish_id,name,serve,price,ingred,required, setDishes, currdishes}) {
  const classes = useStyles(brandLight);

  const {user,setUser} = useContext(AuthContext);
  console.log("Context user:",user);
  const [values, setValues] = React.useState({
    numPeopleServed: serve,
    name: name,
    price: price,
    ingredients: ingred,
    requirements: required,
    cuisine: "Japanese",
    chef: user.id,
  }); 
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      const newdish = await callAPI({
        endpoint: `dish/${dish_id}/${user.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: values,
        token: user.token,
      });
      const index = currdishes.findIndex(obj => obj.id === dish_id);
      currdishes[index] = newdish;
      setDishes(currdishes)
      console.log("New dish from put",currdishes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className={classes.card}>
      <Switch>

      <Route path="/chef/:chef_id/edit">
      <form  className={classes.form} onSubmit={onSubmitAttempt} >

        <Grid className={classes.info}>

          <TextField
              label="How many people to serve."
              className="{classes.textField}"
              value={values.numPeopleServed}
              onChange={handleChange('numPeopleServed')}
              margin="dense"
              variant="outlined"
              type="number"
          />
          <TextField
              label="name"
              className="{classes.textField}"
              value={values.name}
              onChange={handleChange('name')}
              margin="dense"
              variant="outlined"
          />
          <TextField
              label="Price"
              className="{classes.textField}"
              value={values.price}
              onChange={handleChange('price')}
              margin="dense"
              variant="outlined"
              type="number"
          />
          <TextField
              label="Ingredients"
              multiline
              rowsMax="4"
              className="{classes.textField}"
              value={values.ingredients}
              onChange={handleChange('ingredients')}
              margin="dense"
              variant="outlined"
          />

          <TextField
              label="Required Stuff"
              className="{classes.textField}"
              value={values.requirements}
              multiline
              rowsMax="4"
              onChange={handleChange('requirements')}
              margin="dense"
              variant="outlined"
          />
          
        </Grid>

        <Grid className={classes.image}>


        <input
            accept="image/*"
            className={classes.input}
            id="dish-img-file"
            multiple
            type="file"
        />
        <label htmlFor="dish-img-file">
          <Tooltip title="Click to upload new profile" placement="top-start">

            <img className={classes.dishpic} alt="dish" src="/img-sushi.png" />
          </Tooltip>
        </label>
        </Grid>
        
          <SaveButton type="submit" >
            Save Item
          </SaveButton>
        </form>
        </Route>

        <Route path="/chef/:chef_id">
        <div className={classes.form}>
          <Grid className={classes.info}>

              <div>
                <span className={classes.pplnum}> MEAL FOR {serve}</span>
              </div>
              <p className={classes.name}> {name} </p>
              <span className={classes.price}> ${price} </span>
              <span className={classes.bigbold}>INGREDIENTS</span>
              <p className={classes.grey}>{ingred.join(", ")}</p>
              <span className={classes.bigbold}>REQUIRED STUFF</span>
              <p className={classes.grey}>{required.join(", ")}</p>
              
          </Grid>

          <Grid className={classes.image}>
              <img className="dishpic" alt="dish" src="/img-sushi.png" />
          </Grid>
          </div>
        </Route>
              {/* change to if else, if user is logged in and  */}
              {/* this is user's profile page, show edit button */}
              

      </Switch>
    </Card>
  );
}
