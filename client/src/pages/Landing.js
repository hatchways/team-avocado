import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";

const landingPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  }
});

class LandingPage extends Component {
  state = {};

  componentDidMount() {
    // ...
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Typography>{this.state.welcomeMessage}</Typography>
        <SignUpForm
          onSubmit={e => {
            e.preventDefault();
            alert("submitted");
          }}
        />
        <LogInForm
          onSubmit={e => {
            e.preventDefault();
            alert("submitted");
          }}
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
