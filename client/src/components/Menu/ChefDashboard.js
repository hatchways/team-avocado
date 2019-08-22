import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DishCard from "../DishCard/DishCard";
import DishCardForm from "../DishCard/DishCardForm";
import AddDishDialog from "../AddDishDialog";

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

export default function ChefDashboard({ chef }) {
  const [dishes, setDishes] = React.useState([...chef.dishes]);

  function storeUpdatedDish(updatedDish) {
    const newDishesArray = [
      ...dishes.filter(dish => dish.id !== updatedDish.id),
      updatedDish
    ];
    setDishes(newDishesArray);
  }
  function storeNewDish(newDish) {
    const newDishesArray = [...dishes, newDish];
    setDishes(newDishesArray);
  }
  function storeDishImg(imgURL, dish_id) {
    const index = dishes.findIndex(obj => obj._id === dish_id);
    dishes[index].dishImg = imgURL;
    setDishes(dishes);
  }

  let dishCards = dishes.map((dish, index) => {
    return "eyyyy";
    // <DishCard
    //   storeUpdatedDish={storeUpdatedDish}
    //   storeDishImg={storeDishImg}
    //   setDishes={setDishes}
    //   currdishes={dishes}
    //   dish_id={dish._id}
    //   name={dish.name}
    //   serve={dish.numPeopleServed}
    //   price={dish.price}
    //   ingred={dish.ingredients}
    //   required={dish.requirements}
    //   dishImg={dish.dishImg}
    //   key={index}
    // />
  });

  const classes = useStyles();
  return (
    <Grid className={classes.menu}>
      <div className={classes.titlediv}>
        <span className={classes.title}>{chef.name}'s Menu:</span>
      </div>
      <div>
        <AddDishDialog storeNewDish={storeNewDish} />
      </div>
      <div className={classes.scroll}>{dishCards}</div>
    </Grid>
  );
}
