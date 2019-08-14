import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import GoogleMap from "./GoogleMap";
import { colors } from "../themes/theme";
import CuisineList from "./CuisineList";
const { brand, brandLight } = colors;

const RequestButton = styled(Button)`
  color: ${brandLight};
  background: white;
  border-style: solid;
  border-width: 2px;
  border-color: ${brandLight};
  width: 100%;

  &:hover,
  &:active {
    background: ${colors.brandLightTransprt};
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
export default function Namecard({ customer }) {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <div className={classes.upper}>
          <div className={classes.leftpane}>
            <div className={classes.wrap}>
              <img
                className={classes.profile}
                alt="profile"
                src={customer.avatar}
              />
              <span className={classes.name}> {customer.name} </span>
              {/* <p className={classes.grey}> {customer.location} </p> */}
              <RequestButton type="submit">Send Message</RequestButton>
            </div>
          </div>
          <div className={classes.rightpane}>
            <div className={classes.descwrap}>
              <span className={classes.boldbig}>ABOUT ME:</span>
              {/* <p className={classes.grey}>{customer.description}</p> */}
              <span className={classes.boldbig}>FAVORITE CUSINE: </span>
              {/* <CuisineList cuisineList={customer.favorite} /> */}
            </div>
          </div>
        </div>
        <div className={classes.lower}>
          <GoogleMap />
        </div>
      </Card>
    </div>
  );
}
