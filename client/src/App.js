import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ChefPage from "./pages/ChefProfilePage";
import CustomerPage from "./pages/CustomerProfilePage";
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
        <Route
          path="/chef/:chef_id"
          render={({
            match: {
              params: { chef_id }
            }
          }) => <ChefPage chefId={chef_id} />}
        />

        <Route
          path="/customer/:customer_id"
          render={({
            match: {
              params: { customer_id }
            }
          }) => <CustomerPage customerId={customer_id} />}
        />
        <Route path="/browse/chefs" component={BrowseChefsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
