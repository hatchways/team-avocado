import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import GoogleMap from "./GoogleMap";
import { colors } from "../themes/theme";
import CuisineList from "./CuisineList";
import { callAPI } from "../helpers/api";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../store/createContext";
import { Link, withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import useToggle from "../hooks/useToggle";

const { brandLight } = colors;

const RequestButton = styled(Button)`
  color: ${brandLight};
  background: white;
  border-style: solid;
  border-width: 2px;
  border-color: ${brandLight};
  width: 100%;

  &:hover,
  &:active {
    background: ${colors.brandTransparent};
  }
`;
const useStyles = makeStyles({
  profile: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",

    width: "100%",
    height: "87%",
    position: "absolute",
    bottom: 0,
    background: colors.background
  },
  upper: {
    display: "flex",
    height: "52%"
  },
  lower: {
    height: "48%"
  },
  leftpane: {
    width: "40%",
    height: "100%"
  },
  rightpane: {
    width: "60%",
    height: "100%"
  },
  card: {
    width: "70%",
    height: "95%",
    margin: 20
  },
  wrap: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    borderRightColor: colors.background,
    borderRightStyle: "solid",
    borderRightWidth: "5px",
    borderBottomColor: colors.background,
    borderBottomStyle: "solid",
    borderBottomWidth: "5px",
    fontFamily: "Montserrat"
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  grey: {
    color: "grey"
  },
  descwrap: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: 40
  },
  boldbig: {
    fontWeight: "bold"
  }
});
//TODO: pass in props and get data from props

function Namecard({ customer, history, userIsOwner}) {
  console.log("Use is owner:",userIsOwner);
  const classes = useStyles();
  const [values, setValues] = useState({
    name: customer.name,
    strlocation: customer.strlocation,
    description: customer.description,
    favorite: customer.favorite,
    avatar: customer.avatar
  });
  const [isEditing, toggleEditMode] = useToggle(false);

  const [location, setLocation] = useState({
    lat: "",
    lng: ""
  });
  const { user, setUser } = useContext(AuthContext);

  const [key,setKey] = useState("");
  useEffect(() =>{
      async function getApikey(){
        const apikey = await callAPI({
            endpoint: "getenv/CHEF_MENU_GOOGLE_MAP",
            method: "GET",
        });
        setKey(apikey);
      }
      getApikey();
  },[])

  useEffect(() => {
    async function getLatlnt() {
      const address = values.strlocation;
      const googleapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
      if (key != undefined){
      fetch(googleapi)
      .then(response=>response.json())
      .then(data=>{
        if(data.status === "OK"){
          setLocation(data.results[0].geometry.location);
        }
      })
    }
    }
      getLatlnt();
    
  }, [key]);

  function handleSubmit(){
    history.push("/browse/chefs");
  }
  const handleChange = name => event => {
    if(name==="favorite"){
      console.log("Favorite values:",event.target.value);
      setValues({ ...values, [name]: event.target.value.split(",") });
    }else{
      setValues({ ...values, [name]: event.target.value });
    }
  };
  
  async function handleImageSubmit(event) {
    const fileObj = event.target.files[0];
    let formData = new FormData();
    formData.append("image", fileObj);
    const id = event.target.id;
    var imgAlt = "avatar";
    try {
      const endpoint = `customer/${customer._id}/${imgAlt}`;
      const imgURL = await callAPI({
        endpoint: endpoint,
        method: "POST",
        body: formData,
        isForm: true
      });
        setValues({ ...values, avatar: imgURL });
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      const updatedCustomer = await callAPI({
        endpoint: `customer/${customer._id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: values,
        token: user.token
      });

      // setUser(updatedCustomer);
      toggleEditMode();
    } catch (error) {
      console.log(error);
    }
  }
  const ImageUploader = ({ displayImageURL, onSubmit, promptText, children }) => {
    return (
      <Tooltip title={promptText}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <input
            accept="image/*"
            id="background-img-file"
            multiple
            type="file"
            style={{
              opacity: 0,
              position: "absolute",
              top: "0px",
              left: "0px",
              height: "100%",
              width: "100%",
              cursor: "pointer"
            }}
            onChange={onSubmit}
          />
          {children}
        </div>
      </Tooltip>
    );
  };
  const StaticCard = (
      <Card className={classes.card}>
        <div className={classes.upper}>
          <div className={classes.leftpane}>
            <div className={classes.wrap}>
              <img
                className={classes.profile}
                alt="profile"
                src={values.avatar}
              />
              <span className={classes.name}> {values.name} </span>
              <p className={classes.grey}> {values.strlocation} </p>
              {userIsOwner ? (
                <RequestButton onClick={toggleEditMode}>Edit Info</RequestButton>
                ) : (
                  <RequestButton onClick={handleSubmit}>Browse Chef</RequestButton>
                  )}
            </div>
          </div>
          <div className={classes.rightpane}>
            <div className={classes.descwrap}>
              <span className={classes.boldbig}>ABOUT ME:</span>
              <p className={classes.grey}>{values.description}</p>
              <span className={classes.boldbig}>FAVORITE CUSINE: </span>
              <CuisineList cuisineList={values.favorite} />
            </div>
          </div>
        </div>
        <div className={classes.lower}>
          <GoogleMap  location={location} apikey = {key} zoom={13}/>
        </div>
      </Card>

  );

  const EditModeCard = (
    <Card className={classes.card} >
    <div className={classes.upper}>
      <div className={classes.leftpane}>
        <div className={classes.wrap} >
          <ImageUploader
          onSubmit={handleImageSubmit}
          promptText="Click to upload a new background"
          >
            <img
              className={classes.profile}
              alt="profile"
              src={values.avatar}
            />          
          </ImageUploader>

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
          <RequestButton onClick={onSubmitAttempt}>Save Profile</RequestButton>
        </div>
      </div>
      <div className={classes.rightpane}>
        <div className={classes.descwrap}>
          <span className={classes.boldbig}>ABOUT ME:</span>
          <TextField
            className="form-field"
            label="About Me"
            value={values.description}
            onChange={handleChange("description")}
            margin="dense"
            multiline
            variant="outlined"
          />
          <span className={classes.boldbig}>FAVORITE CUSINE: </span>
          <TextField
            className="form-field"
            label="Favorite Cuisines"
            value={values.favorite}
            onChange={handleChange("favorite")}
            margin="dense"
            multiline
            variant="outlined"
          />
        </div>
      </div>
    </div>
    <div className={classes.lower}>
    </div>

  </Card>
  )
  return (
    <div className={classes.cardContainer}>
      {userIsOwner && isEditing ? EditModeCard : StaticCard}
    </div>
  );
}


export default withRouter(Namecard);