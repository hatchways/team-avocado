import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
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
import ImageUploader from "./ImageUploader";

const { brandLight, background } = colors;

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

const Card = styled.div`
  background: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: all 100ms;

  .upper {
    display: flex;
    border-bottom: 2px solid ${background};
  }

  .lower {
    height: 250px;
  }

  .leftUpper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 40%;
    text-align: center;
    border-right: 2px solid ${background};
    min-height: 300px;
  }

  .rightUpper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    padding: 1rem;
    flex-grow: 1;
    padding: 3rem;

    /* & > div {
      display: flex;
      flex-direction: column;
    } */
  }

  .form-field {
    width: 100%;
  }
`;

const useStyles = makeStyles({
  // cardContainer: {
  //   display: "flex",
  //   justifyContent: "center",

  //   width: "100%",
  //   height: "87%",
  //   position: "absolute",
  //   bottom: 0,
  //   background: colors.background
  // },
  // upper: {
  //   display: "flex",
  //   height: "52%"
  // },
  // lower: {
  //   height: "48%"
  // },
  // leftpane: {
  //   width: "40%",
  //   height: "100%"
  // },
  // rightpane: {
  //   width: "60%",
  //   height: "100%"
  // },
  card: {
    width: "100%",
    height: "100%",
    margin: 20
  },
  // wrap: {
  //   height: "100%",
  //   display: "flex",
  //   justifyContent: "space-around",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   padding: 40,

  //   borderRightColor: colors.background,
  //   borderRightStyle: "solid",
  //   borderRightWidth: "5px",
  //   borderBottomColor: colors.background,
  //   borderBottomStyle: "solid",
  //   borderBottomWidth: "5px",
  //   fontFamily: "Montserrat"
  // },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  grey: {
    color: "grey"
  },
  // descwrap: {
  //   height: "100%",
  //   display: "flex",
  //   justifyContent: "space-around",
  //   flexDirection: "column",
  //   padding: 40
  // },
  boldbig: {

    fontWeight: "bold",
    display: "block"
  },
  profile: {
    display: "block",
    height: 100,
    width: 100,
    borderRadius: "50%",
    objectFit: "cover",
    margin: "10px auto"
  }
});
//TODO: pass in props and get data from props

function Namecard({ customer, history, userIsOwner }) {
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

  const [key, setKey] = useState("");
  useEffect(() => {
    async function getApikey() {
      const apikey = await callAPI({
        endpoint: "getenv/CHEF_MENU_GOOGLE_MAP",
        method: "GET"
      });
      setKey(apikey);
    }
    getApikey();
  }, []);

  useEffect(() => {
    async function getLatlnt() {
      const address = values.strlocation;
      const googleapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
      if (key != undefined) {
        fetch(googleapi)
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              setLocation(data.results[0].geometry.location);
            }
          });
      }
    }

    if (values.strlocation) {
      getLatlnt();
    }
  }, [key, values.strlocation]);

  function handleSubmit() {
    history.push("/browse/chefs");
  }
  const handleChange = name => event => {
    if (name === "favorite") {
      setValues({ ...values, [name]: event.target.value.split(",") });
    } else {
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

  const StaticCard = (
    <>
      <div className="upper">
        <div className="leftUpper">
          <img className={classes.profile} alt="profile" src={values.avatar} />
          <div className={classes.name}> {values.name} </div>
          <p className={classes.grey}> {values.strlocation} </p>
          {userIsOwner ? (
            <RequestButton onClick={toggleEditMode}>Edit Info</RequestButton>
          ) : (
            <RequestButton onClick={handleSubmit}>Browse Chef</RequestButton>
          )}

        </div>
        <div className="rightUpper">
          <span className={classes.boldbig}>ABOUT ME:</span>
          <p className={classes.grey}>{customer.description}</p>
          <span className={classes.boldbig}>FAVORITE CUSINE: </span>
          <CuisineList cuisineList={values.favorite} />
        </div>

      </div>
      <div className="lower">
        <GoogleMap location={location} apikey={key} zoom={13} />
      </div>
    </>
  );

  const EditModeCard = (
    <div className="upper">
      <div className="leftUpper">
        <ImageUploader
          onSubmit={handleImageSubmit}
          promptText="Click to upload a new background"
        >
          <img className={classes.profile} alt="profile" src={values.avatar} />
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
      <div className="rightUpper">
        <div>
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
        </div>
        <div>
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
  );
  return (
    <Card key="3">{userIsOwner && isEditing ? EditModeCard : StaticCard}</Card>
  );
}

export default withRouter(Namecard);
