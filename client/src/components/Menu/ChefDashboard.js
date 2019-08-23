import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

import Order from "../Order";
import DishCard from "../DishCard/DishCard";
import DishCardForm from "../DishCard/DishCardForm";
import AddDishDialog from "../AddDishDialog";
import Button from "../Button";
import { colors } from "../../themes/theme";

const MENU_TAB = 0,
  ORDERS_TAB = 1;

const TabContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: stretch;
  position: sticky;
  z-index: 10;
  top: 0px;
  width: 100%;

  /* align-self: flex-start; */
  button {
    flex-grow: 1;
    text-transform: uppercase;
  }

  button.active {
    background-color: ${colors.brandTransparent};
  }
`;

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f8f8fe",
    height: "100%",
    width: "100%",
    fontFamily: "Montserrat"
  },

  scroll: {
    // width: "80%",
    // height: "83%",
    // overflowY: "scroll"
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
  const [dishes, setDishes] = React.useState(
    chef.dishes.map(dish => {
      return {
        data: dish,
        isEditing: false
      };
    })
  );

  const [activeTab, setTab] = useState(MENU_TAB);

  function toggleDishEditing(dishIndex) {
    console.log("toggling dish at index " + dishIndex);

    const newDishes = [...dishes];

    newDishes[dishIndex].isEditing = !newDishes[dishIndex].isEditing;

    setDishes(newDishes);
  }

  function storeUpdatedDish(updatedDish) {
    updatedDish = { isEditing: false, data: updatedDish };
    const targetIndex = dishes.findIndex(
      dish => dish.data._id === updatedDish.data._id
    );

    const newDishesArray = [...dishes];

    newDishesArray.splice(targetIndex, 1, updatedDish);

    setDishes(newDishesArray);
  }
  function storeNewDish(newDish) {
    newDish = { isEditing: false, data: newDish };

    const newDishesArray = [...dishes, newDish];
    setDishes(newDishesArray);
  }
  function storeDishImg(imgURL, dish_id) {
    const index = dishes.findIndex(dish => dish.data._id === dish_id);
    dishes[index].data.dishImg = imgURL;
    setDishes(dishes);
  }

  // let dishCards = dishes.map((dish, index) => {
  //   if (dish.isEditing)
  //     return (
  //       <DishCardForm
  //         storeUpdatedDish={storeUpdatedDish}
  //         storeDishImg={storeDishImg}
  //         setDishes={setDishes}
  //         currdishes={dishes}
  //         dish_id={dish.data._id}
  //         name={dish.data.name}
  //         numPeopleServed={dish.data.numPeopleServed}
  //         price={dish.data.price}
  //         ingredients={dish.data.ingredients}
  //         requirements={dish.data.requirements}
  //         dishImg={dish.data.dishImg}
  //         key={dish.data._id}
  //         toggleEdit={toggleDishEditing.bind(index)}
  //       />
  //     );
  //   else
  //     return (
  //       <DishCard
  //         name={dish.data.name}
  //         numPeopleServed={dish.data.numPeopleServed}
  //         price={dish.data.price}
  //         ingredients={dish.data.ingredients}
  //         requirements={dish.data.requirements}
  //         dishImg={dish.data.dishImg}
  //         key={dish.data._id}
  //         toggleEdit={toggleDishEditing.bind(null, index)}
  //       />
  //     );
  // });

  const classes = useStyles();
  return (
    <>
      <TabContainer className={classes.tabContainer}>
        <Button outline onClick={() => setTab(MENU_TAB)}>
          My Menu
        </Button>
        <Button outline onClick={() => setTab(ORDERS_TAB)}>
          My Order History
        </Button>
        <AddDishDialog storeNewDish={storeNewDish} />
      </TabContainer>

      {activeTab === ORDERS_TAB ? (
        <>
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
        </>
      ) : (
        <>
          {dishes.map((dish, index) => {
            if (dish.isEditing)
              return (
                <DishCardForm
                  storeUpdatedDish={storeUpdatedDish}
                  storeDishImg={storeDishImg}
                  setDishes={setDishes}
                  currdishes={dishes}
                  dish_id={dish.data._id}
                  name={dish.data.name}
                  numPeopleServed={dish.data.numPeopleServed}
                  price={dish.data.price}
                  ingredients={dish.data.ingredients}
                  requirements={dish.data.requirements}
                  dishImg={dish.data.dishImg}
                  key={dish.data._id}
                  toggleEdit={toggleDishEditing.bind(index)}
                />
              );
            else
              return (
                <DishCard
                  name={dish.data.name}
                  numPeopleServed={dish.data.numPeopleServed}
                  price={dish.data.price}
                  ingredients={dish.data.ingredients}
                  requirements={dish.data.requirements}
                  dishImg={dish.data.dishImg}
                  key={dish.data._id}
                  toggleEdit={toggleDishEditing.bind(null, index)}
                />
              );
          })}
        </>
      )}
    </>
  );
}
