import React, { useState, useContext } from "react";
import { validate } from "email-validator";

import Context from "../store/createContext";
import { layout } from "../themes/theme";
import Snackbar from "./Snackbar";
import Button from "./Button";
import TextField from "./TextField";
import PasswordInput from "./PasswordInput";
import { callAPI } from "../helpers/api";
import { Link, withRouter } from "react-router-dom";

// Each function is passed the object containing all field values in case of field interdependencies
// Validators return an object containing updates for the error messages object.
const validators = {
  name: function({ name }) {
    if (!name) {
      return { name: "Required" };
    } else if (name.length < 3) {
      return { name: "Name must be at least 3 characters" };
    } else return { name: "" };
  },
  email: function({ email }) {
    if (!email) {
      return { email: "Required" };
    } else if (!validate(email)) {
      return { email: "Invalid email address" };
    } else return { email: "" };
  },
  password: function({ password, confirmPassword }) {
    const update = {
      password: "",
      confirmPassword: ""
    };
    if (password.length < 8) {
      update.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      update.confirmPassword = "Does not match";
    }
    return update;
  },
  confirmPassword: function({ password, confirmPassword }) {
    if (password !== confirmPassword) {
      return { confirmPassword: "Does not match" };
    } else return { confirmPassword: "" };
  }
};

function validateField(fieldName, fieldValues) {
  return validators[fieldName](fieldValues);
}

function SignUpForm({ onSubmit: submitForm, userType, history}) {
  let [fieldValues, setFieldValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }),
    [errorMessages, setErrorMessages] = useState({ ...fieldValues }),
    [formState, setFormState] = useState({
      isSubmittable: false,

      error: null,
      showingMessage: false
    });

  const { setUser } = useContext(Context);

  const { name, email, password, confirmPassword } = fieldValues;

  function displayErrorMessage(error) {
    setFormState({ ...formState, error, showingMessage: true });
  }

  function formIsSubmittable() {
    const noErrors = Object.values(errorMessages).every(value => value === ""),
      noEmptyFields = Object.values(fieldValues).every(value => value !== "");

    return noErrors && noEmptyFields;
  }

  function onChange(e) {
    e.preventDefault();
    const {
      target: { name, value }
    } = e;

    const newFieldValues = {
      ...fieldValues,
      [name]: value
    };
    setFieldValues(newFieldValues);
    setErrorMessages({
      ...errorMessages,
      ...validateField(name, newFieldValues)
    });
  }

  function onBlur(e) {
    const {
      target: { name: fieldName }
    } = e;
    setErrorMessages({
      ...errorMessages,
      ...validateField(fieldName, fieldValues)
    });
  }

  async function onSubmitAttempt(e) {
    e.preventDefault();

    if (formIsSubmittable()) {
      try {
        const user = await callAPI({
          endpoint: "signup",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: { name, email, password, type: userType }
        });

        setUser(user);
        history.push(`/${userType}/${user.id}/edit`);
      } catch (error) {
        displayErrorMessage(error);
      }
    }
  }
  const otherUser = userType==="chef" ? "customer":"chef"; 
  const endpoint = `/signup/${otherUser}`;
  return (
    <form onSubmit={onSubmitAttempt}>
      <TextField
        label={"Name"}
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Enter your name"
        helperText={errorMessages.name}
        error={!!errorMessages.name}
      />
      <TextField
        label={"Email"}
        value={email}
        name="email"
        onChange={onChange}
        placeholder="Enter your email address"
        onBlur={onBlur}
        helperText={errorMessages.email}
        error={!!errorMessages.email}
      />
      <PasswordInput
        label={"Password"}
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter a password"
        helperText={errorMessages.password}
        error={!!errorMessages.password}
      />

      <PasswordInput
        label={"Confirm Password"}
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        placeholder=""
        helperText={errorMessages.confirmPassword}
        error={!!errorMessages.confirmPassword}
      />
      <div  style={{
            color: "inherit",
            fontSize: "0.75rem"
          }}>
      <Link to={endpoint}> Register as a {otherUser} </Link>
      </div>
      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign Up
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

export default withRouter(SignUpForm);
