import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DishCard from './DishCard';
import AddDishDialog from './AddDishDialog'
import { Route,  Switch } from "react-router-dom";
import { callAPI } from "../helpers/api";
import { useEffect} from "react";

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
  function storeUpdatedDish(updatedDish){
    const newDishesArray = [...dishes.filter(dish=>dish.id !== updatedDish.id), updatedDish];
    setDishes(newDishesArray);
  }
  function storeNewDish(newDish){
    const newDishesArray = [...dishes, newDish];
    setDishes(newDishesArray);
  }
  function storeDishImg(imgURL,dish_id){
    const index = dishes.findIndex(obj => obj._id === dish_id);
    dishes[index].dishImg = imgURL;
    setDishes(dishes);
  }
  useEffect(() => {
    async function getChef(){
      const chef= await callAPI({
          endpoint: endpoint,
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
      });

      setDishes(chef.dishes);

    }
    getChef()
  
  },[]);
      let dishCardComponent = dishes.map((dish,index) =>{
          return <DishCard storeUpdatedDish={storeUpdatedDish}  storeDishImg={storeDishImg} setDishes={setDishes} currdishes={dishes} dish_id={dish._id} name={dish.name} serve={dish.numPeopleServed} price={dish.price} ingred={dish.ingredients} required={dish.requirements} dishImg={dish.dishImg} key={index}/>;

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
                <AddDishDialog storeNewDish={storeNewDish}/>
              </div>
            </Route>
        </Switch>
        <div className={classes.scroll}>
          {dishCardComponent}
        </div>
    </Grid>
  );
}



