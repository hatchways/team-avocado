import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ChefPage from "./pages/ChefProfilePage";
import "./App.css";
import BrowseChefsPage from "./pages/BrowseChefsPage";

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
        <Route path="/browse/chefs" component={BrowseChefsPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
