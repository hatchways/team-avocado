import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ChefPage from "./pages/ChefProfilePage";
import "./App.css";

//TODO: Implement this
function browserHasToken() {
  return false;
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {browserHasToken() ? null : <Redirect to="signup/customer" />}
        </Route>
        <Route path="/(signup||login)" component={AuthPage} />
        <Route path="/chef/:chef_id" component={ChefPage}/>
        <Route path="/customer/:customer_id" />
        <Route path="/browse" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
