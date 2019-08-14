import React, { useContext } from "react";
import styled from "styled-components";

import { Route, Link, Switch } from "react-router-dom";

import { layout } from "../themes/theme";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import SignUpForm from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";

const PageContainer = styled.div`
  display: flex;
  align-items: stretch;

  .paneLeft {
    height: 100vh;
    width: 40%;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .paneRight {
    height: 100vh;
    width: 60%;
    overflow: hidden;
  }

  .formContainer {
    width: 70%;
  }

  h1 {
    font-weight: normal;
    margin: 40px 0px;
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  nav span {
    margin-right: ${layout.spacing(4)};
    color: white;
  }
`;

function AuthPage({ classes, ...rest }) {
  /**
   *  Conditionally renders one of :
   *
   *      Customer signup form
   *      Chef signup form
   *      Generic Login form
   *
   *  ... depending on the URL
   */

  return (
    <PageContainer className="pageContainer">
      <Navbar transparent>
        <Switch>
          <Route path="/login">
            <span>Don't have an account?</span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/signup/customer"
            >
              <Button>Sign Up</Button>
            </Link>
          </Route>
          <Route path="/signup/:userType">
            <span>Already a member?</span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/login"
            >
              <Button>Sign In</Button>
            </Link>
          </Route>
        </Switch>
      </Navbar>

      <div className="paneLeft">
        <div className="formContainer">
          <Switch>
            <Route path="/login">
              <h1>Login</h1>
              <LogInForm />
            </Route>
            <Route
              path="/signup/:userType"
              render={({
                match: {
                  params: { userType }
                }
              }) => (
                <>
                  <h1>Create an account</h1>
                  <SignUpForm userType={userType} />
                </>
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="paneRight">
        <img className="image" alt="bg img" src="/bg-img-sushi.png" />
      </div>
    </PageContainer>
  );
}

export default AuthPage;
