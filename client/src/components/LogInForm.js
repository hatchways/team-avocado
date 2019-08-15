
import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import Snackbar from "./Snackbar";
import TextField from "./TextField";
import PasswordInput from "./PasswordInput";
import Button from "./Button";
import { layout } from "../themes/theme";
import { callAPI } from "../helpers/api";

import Context from "../store/createContext";

function LogInForm(props) {
  let [formValues, setFormValues] = useState({ email: "", password: "" }),
    [formState, setFormState] = useState({
      isSubmittable: false,
      error: null,
      showingMessage: false
    });
  const { email, password } = formValues,
    { error, isSubmittable, showingMessage } = formState;


  const {chef, setUser } = useContext(Context);

  function displayErrorMessage(error) {
    setFormState({ ...formState, error, showingMessage: true });
  }

  function onChange(e) {
    const {
      target: { name, value }
    } = e;

    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      const user = await callAPI({
        endpoint: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: { email, password }
      });
      console.log(user);

      setUser(user);

      props.history.push(`${user.usertype}/${user.id}/edit`);
    } catch (error) {
      displayErrorMessage(error);
    }
  }

  return (
    <form onSubmit={onSubmitAttempt}>
      <TextField
        label={"Email"}
        value={email}
        name="email"
        onChange={onChange}
      />

      <PasswordInput
        label={"Password"}
        value={password}
        onChange={onChange}
        name="password"
      />

      <div>
        <Link
          to="/password-recovery"
          style={{
            color: "inherit",
            fontSize: "0.75rem"
          }}
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign In
      </Button>

      {formState.showingMessage && (
        <Snackbar
          className="formErrorMessage"
          onClose={() => setFormState({ ...formState, showingMessage: false })}
          message={formState.error.message}
        />
      )}
    </form>
  );
}

export default withRouter(LogInForm);
