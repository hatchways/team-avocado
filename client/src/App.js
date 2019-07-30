import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

import "./App.css";

//TODO: Implement this
function browserHasToken() {
  return false;
}

function App() {
  // Check for

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!browserHasToken() && <Redirect to="signup/customer" />}
        </Route>
        <Route path="/(signup||login)" component={AuthPage} />
        <Route path="/chef/:chef_id" />
        <Route path="/customer/:customer_id" />
        <Route path="/browse" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
