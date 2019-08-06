import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

const SaveButton = styled(Button)`
  min-width: 100px;
`;
const useStyles = makeStyles({
  card: {
    minWidth: "70%",
    minHeight:"43%",
    display:'flex',
    justifyContent:"space-between",
    margin:10,
  },

  image:{
    padding:40,
  },

  info:{
    display: 'flex',
    flexDirection:"column",
    paddingLeft:40,
    paddingTop:40,
    paddingBottom:40,
  },

  pplnum:{
    backgroundColor: "#FF743D",
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
  }

});

export default function SimpleCard() {
  const classes = useStyles();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [values, setValues] = React.useState({
    serve: 'MEAL FOR 2',
    name: '4 Specialty Roll',
    price:'$15.00',
    ingred:'Rice, nori, avacado, crab, cucumber, wasabi, rice vinegar, soy sauce, salt, sugar.',
    required:"Kitchen Table, Cooking plate",
  }); 



  return (
    <Card className={classes.card}>
      <Switch>

      <Route path="/chef/edit/:chef_id">
        <Grid className={classes.info}>
          <TextField
              id="outlined-name"
              label="How many people to serve."
              className="{classes.textField}"
              value={values.serve}
              onChange={handleChange('serve')}
              margin="dense"
              variant="outlined"
          />
          <TextField
              id="outlined-name"
              label="name"
              className="{classes.textField}"
              value={values.name}
              onChange={handleChange('name')}
              margin="dense"
              variant="outlined"
          />
          <TextField
              id="outlined-price"
              label="Price"
              className="{classes.textField}"
              value={values.price}
              onChange={handleChange('price')}
              margin="dense"
              variant="outlined"
          />
          <TextField
              id="outlined-ingred"
              label="Ingredients"
              multiline
              rowsMax="4"
              className="{classes.textField}"
              value={values.ingred}
              onChange={handleChange('ingred')}
              margin="dense"
              variant="outlined"
          />

          <TextField
              id="outlined-required"
              label="Required Stuff"
              className="{classes.textField}"
              value={values.required}
              multiline
              rowsMax="4"
              onChange={handleChange('required')}
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
          <img className={classes.dishpic} alt="dish" src="/img-sushi.png" />

        </label>
        </Grid>
        <SaveButton type="submit" >
          Save Item
        </SaveButton>
          
        </Route>

        <Route path="/chef/:chef_id">
          <Grid className={classes.info}>

              <div>
                <span className={classes.pplnum}> MEAL FOR 2</span>
              </div>
              <p id="dishname"> 4 specialty rolls </p>
              <span id="price"> $15.00 </span>
              <span id="upperbig">INGREDIENTS</span>
              <p id="greysmall">Rice, nori, avacado, crab, cucumber, wasabi, rice vinegar, soy sauce, salt, sugar.</p>
              <span id="upperbig">REQUIRED STUFF</span>
              <p id="greysmall">Kitchen Table, Cooking plate</p>
              
          </Grid>

          <Grid className={classes.image}>
              <img className="dishpic" alt="dish" src="/img-sushi.png" />
          </Grid>
        </Route>
              {/* change to if else, if user is logged in and  */}
              {/* this is user's profile page, show edit button */}
              

      </Switch>
    </Card>
  );
}
