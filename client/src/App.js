import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import ContextProvider from "./store/Provider";
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
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {browserHasToken() ? null : <Redirect to="signup/customer" />}
          </Route>
          <Route path="/(signup||login)" component={AuthPage} />
          <Route
            path="/chef/:chef_id"
            render={({ match }) => <ChefPage chefId={match.params.chef_id} />}
          />
          <Route
            path="/customer/:customer_id"
            render={({ match }) => (
              <CustomerPage customerId={match.params.customer_id} />
            )}
          />
          <Route path="/browse" component={BrowseChefsPage} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
