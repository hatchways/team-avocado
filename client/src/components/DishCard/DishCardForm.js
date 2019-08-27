import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { Route, Switch } from "react-router-dom";

import ImageUploader from "../ImageUploader";
import CardContainer from "./CardContainer";
import Button from "../Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { colors } from "../../themes/theme";
import Tooltip from "@material-ui/core/Tooltip";
import { callAPI } from "../../helpers/api";
import { useContext } from "react";
import AuthContext from "../../store/createContext";

const { brandLight } = colors;
const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "70%",
    minHeight: "43%",
    margin: 5
  },

  image: {
    padding: 40
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    padding: 40
  },

  pplnum: {
    backgroundColor: brandLight,
    color: "white",
    padding: "10px",
    display: "inline",
    justifyContent: "space-between"
  },
  textField: {
    fullWidth: "true"
  },
  input: {
    display: "none"
  },
  dishpic: {
    cursor: "pointer"
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  price: {
    color: colors.brandLight
  },
  bigbold: {
    fontWeight: "bold"
  },
  grey: {
    color: "grey"
  }
}));

export default function SimpleCard({
  dishImg,
  name,
  numPeopleServed,
  price,
  ingredients,
  requirements,
  storeUpdatedDish,
  storeDishImg,
  toggleEdit,
  dish_id
}) {
  const classes = useStyles(brandLight);

  const { user, setUser } = useContext(AuthContext);
  const [values, setValues] = React.useState({
    numPeopleServed: numPeopleServed,
    name: name,
    price: price,
    ingredients: ingredients,
    requirements: requirements,
    cuisine: "Japanese",
    chef: user.id,
    dishImg: dishImg
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
        token: user.token
      });

      storeUpdatedDish(newdish);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitImage(event) {
    event.preventDefault();
    const fileObj = event.target.files[0];
    let formData = new FormData();
    formData.append("image", fileObj);
    try {
      const endpoint = `dish/${dish_id}/dishImg`;
      const imgURL = await callAPI({
        endpoint: endpoint,
        method: "POST",
        body: formData,
        isForm: true
      });
      setValues({ ...values, dishImg: imgURL });
      storeDishImg(imgURL, dish_id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CardContainer>
      <form onSubmit={onSubmitAttempt}>
        <TextField
          label="How many people to serve."
          className="{classes.textField}"
          value={values.numPeopleServed}
          onChange={handleChange("numPeopleServed")}
          margin="dense"
          variant="outlined"
          type="number"
        />
        <TextField
          label="name"
          className="{classes.textField}"
          value={values.name}
          onChange={handleChange("name")}
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Price"
          className="{classes.textField}"
          value={values.price}
          onChange={handleChange("price")}
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
          onChange={handleChange("ingredients")}
          margin="dense"
          variant="outlined"
        />

        <TextField
          label="requirements Stuff"
          className="{classes.textField}"
          value={values.requirements}
          multiline
          rowsMax="4"
          onChange={handleChange("requirements")}
          margin="dense"
          variant="outlined"
        />
        <Button style={{ display: "block" }} type="submit">
          Save Item
        </Button>
      </form>
      <ImageUploader
        promptText={"Click to upload new dish image"}
        onSubmit={handleSubmitImage}
      >
        <img alt="dish" src={values.dishImg} />
      </ImageUploader>
    </CardContainer>
  );
}
