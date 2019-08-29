import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "./Button";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../store/createContext";
import { callAPI } from "../helpers/api";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const Stepper = ({ handleDecrement, handleIncrement, value }) => (
  <div>
    <FiMinusCircle onClick={handleDecrement} />
    <span>{value}</span>
    <FiPlusCircle onClick={handleIncrement} />
  </div>
);

const DishContainer = styled.ul`
  padding: 0px;
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid #333333;
    height: 30px;
    user-select: none;

    .dish-name {
      width: 300px;
    }

    .dish-price {
      font-weight: lighter;
      font-style: italic;
      text-align: left;
      width: 100px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        padding: 5px;
        width: 25px;
        text-align: center;
      }
    }
  }
`;

function SendRequestDialog({ chef, history }) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [orderState, setOrderState] = React.useState({
    dishes: chef.dishes.reduce((accum, dish) => {
      accum[dish._id] = 0;
      return accum;
    }, {}),
    numPeopleServed: 1,
    bookedTime: new Date("2014-08-18T21:11:54")
  });

  const { user, setOrder } = useContext(AuthContext);

  console.log(user);

  const handleAddDish = dishId => {
    const currentVal = orderState.dishes[dishId];

    const newDishes = {
      ...orderState.dishes,
      [dishId]: currentVal + 1
    };

    setOrderState({ ...orderState, dishes: newDishes, chef_name:chef.name, customer_name:user.name });
  };

  const handleRemoveDish = dishId => {
    const currentVal = orderState.dishes[dishId];

    if (currentVal === 0) return;

    const newDishes = {
      ...orderState.dishes,
      [dishId]: currentVal - 1 || 0
    };

    setOrderState({ ...orderState, dishes: newDishes });
  };

  const handleChangeNumPeopleServed = e => {
    if (e.target.value == -1) return;
    setOrderState({ ...orderState, numPeopleServed: e.target.value });
  };

  const handleChangeDate = date => {
    setOrderState({ ...orderState, bookedTime: date });
  };

  const getTotal = () => {
    return Object.entries(orderState.dishes).reduce((accum, entry) => {
      const [dishId, numDishes] = entry,
        dishPrice = chef.dishes.find(dish => dish._id === dishId).price;

      return accum + dishPrice * numDishes;
    }, 0);
  };

  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      // convert dishes from hash into expected array form
      const requestBody = {
        ...orderState,
        price: getTotal(),
        dishes: Object.entries(orderState.dishes).reduce((accum, entry) => {
          const [dishId, numDishes] = entry;

          if (numDishes > 0) {
            accum.push({
              dish: dishId,
              numDishes,
              price: chef.dishes.find(dish => dish._id === dishId).price
            });
          }

          return accum;
        }, [])
      };

      const newOrder = await callAPI({
        endpoint: `order/${chef._id}/${user.id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: requestBody,
        token: user.token
      });

      setOrder(newOrder);

      history.push("/checkout");

      console.log("New order", newOrder);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button onClick={handleClickOpen}> Send Request</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request a chef, please fill in the form and click submit button.
            <span>{console.dir(orderState)}</span>
          </DialogContentText>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={orderState.bookedTime}
              onChange={handleChangeDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={orderState.bookedTime}
              onChange={handleChangeDate}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="serve"
            label="How many people will the chef serve?"
            type="number"
            value={orderState.numPeopleServed}
            onChange={handleChangeNumPeopleServed}
            fullWidth
          />
          <DishContainer>
            {chef.dishes.map(dish => {
              const { _id: dishId, name, price } = dish;

              return (
                <li>
                  <span className="dish-name">{name}</span>
                  <span className="dish-price">${price}</span>

                  <Stepper
                    value={orderState.dishes[dishId]}
                    handleIncrement={() => handleAddDish(dishId)}
                    handleDecrement={() => handleRemoveDish(dishId)}
                  />
                </li>
              );
            })}
          </DishContainer>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "space-between", padding: "0px 30px" }}
        >
          <h5 style={{ fontSize: "24px" }}>Total: ${getTotal()}</h5>
          <div>
            <Button onClick={handleClose} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button onClick={onSubmitAttempt}>Submit</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withRouter(SendRequestDialog);
