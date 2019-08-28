import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Route, Switch } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PickTagDialog from "./PickTagDialog";

import ImageUploader from "./ImageUploader";
import useToggle from "../hooks/useToggle";
import { callAPI } from "../helpers/api";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../store/createContext";
import { Link } from "react-router-dom";
import SendRequestDialog from "./SendRequestDialog";
import {totalCuisines} from "../constants/cuisines"
import AvailabilityDialog from "./AvailabilityDialog";
import CuisineList from "./CuisineList";



const Container = styled.div`
  height: 100%;
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
  #cover {
    object-fit: cover;
    height: 170px;
    width: 100%;
  }

  .content-container {
    flex-grow: 1;
  }

  .content {
    text-align: center;
    height: 100%;
    position: relative;
    top: -75px;
    font-size: 0.75rem;
    padding: 0px 10%;

    & > * {
      margin: 0px;
      margin-bottom: 30px;
    }
  }

  #profile {
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 5px solid white;
    background-color: white;
    border-radius: 50%;
    width: 150px;
  }

  .name,
  .location {
    margin: 0px;
  }

  .location {
    color: rgba(0, 0, 0, 0.5);
    font-weight: bold;
  }

  .button-container {
    height: 150px;
  }
  button {
    height: 100%;
    width: 100%;
  }
`;

const FormContainer = styled.form`
  height: 100%;
  overflow-y: scroll;

  div {
    display: block;
  }
`;

const cuisines = ["Chinese", "Indian", "American", "Japanese"];


export default function Namecard({ chef, userIsOwner }) {
  const [isEditing, toggleEditMode] = useToggle(false);

  const [values, setValues] = React.useState({
    name: chef.name,
    strlocation: chef.strlocation,
    description: chef.description,
    avatar: chef.avatar,
    background: "https://i.imgur.com/K1knFqf.jpg",
    cuisines:chef.cuisines,
  });
  function setValuesCuisines(cuisines){
      setValues({...values, cuisines:cuisines});
  }
  const { user, setUser } = useContext(AuthContext);
  const [restCuisines, setRestCuisines] = useState([]);
  
  function setCuisines(cuisines, chefsCuisines){
      console.log(cuisines, chefsCuisines);
      let difference = cuisines.filter(x => !chefsCuisines.includes(x));
      console.log(difference);
      return difference;
  }
  useEffect(()=>{
      const rest = setCuisines(totalCuisines, values.cuisines);
      setRestCuisines(rest);
  },[values])
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      const updatedChef = await callAPI({
        endpoint: `chef/${chef._id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: values,
        token: user.token
      });

      setUser(updatedChef);
      toggleEditMode();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleImageSubmit(event) {
    const fileObj = event.target.files[0];
    console.log("FileObj", fileObj);
    let formData = new FormData();
    console.log("target.id", event.target.id);

    formData.append("image", fileObj);
    const id = event.target.id;
    if (id === "profile-img-file") {
      var imgAlt = "avatar";
    } else if (id === "background-img-file") {
      var imgAlt = "chef_background";
    }
    try {
      const endpoint = `chef/${chef._id}/${imgAlt}`;
      const imgURL = await callAPI({
        endpoint: endpoint,
        method: "POST",
        body: formData,
        isForm: true
      });

      if (imgAlt === "chef_background") {
        setValues({ ...values, background: imgURL });
      } else if (imgAlt === "avatar") {
        setValues({ ...values, avatar: imgURL });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const StaticCard = (
    <>
      <img id="cover" alt="background" src={values.background} />
      <div className="content-container">
        <div className="content">
          <img src={values.avatar} alt="" id="profile" />
          <div>
            <h1 className="name">{values.name}</h1>
            <p className="location"> {values.strlocation}</p>
          </div>
          <div>
            <p className="description">{values.description}</p>
          </div>
          <div>
            <CuisineList cuisineList={values.cuisines} />
          </div>
        </div>
      </div>
      <div className="button-container">
        {userIsOwner ? (
          <Button onClick={toggleEditMode}>Edit Info</Button>
        ) : (
          user && <SendRequestDialog chef={chef} />
        )}
      </div>
    </>
  );


  const EditModeCard = (
    <FormContainer onSubmit={onSubmitAttempt}>
      <ImageUploader
        onSubmit={handleImageSubmit}
        promptText="Click to upload a new background"
      >
        <img src={values.background} id="cover" />
      </ImageUploader>
      <div className="content-container">
        <div className="content">
          <ImageUploader
            onSubmit={handleImageSubmit}
            promptText="Click to upload a new profile picture"
          >
            <img src={values.avatar} alt="" id="profile" />
          </ImageUploader>
          <PickTagDialog cuisines={values.cuisines} restCuisines={restCuisines} setValuesCuisines={setValuesCuisines}/>
          <AvailabilityDialog />
          <TextField
            className="form-field"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="form-field"
            label="Location"
            value={values.strlocation}
            onChange={handleChange("strlocation")}
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="form-field"
            label="Description"
            multiline
            rowsMax="4"
            value={values.description}
            onChange={handleChange("description")}
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="form-field"
            label="Old Password"
            value={values.oldpassword}
            onChange={handleChange("oldpassword")}
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="form-field"
            label="New Password"
            value={values.newpassword}
            onChange={handleChange("newpassword")}
            margin="dense"
            variant="outlined"
          />
        </div>
      </div>
      <div className="button-container">
        <Button type="submit">Save Profile</Button>
      </div>
    </FormContainer>
  );

  return (
    <Container>

      {userIsOwner && isEditing ? EditModeCard : StaticCard}

    </Container>
  );
}
