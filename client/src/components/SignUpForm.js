import React, { useState } from "react";
import { validate } from "email-validator";

import { layout } from "../themes/theme";
import Button from "./Button";
import TextField from "./TextField";
import { API_URL } from "../constants";

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
      console.log(update);
    }

    if (password != confirmPassword) {
      update.confirmPassword = "Does not match";
    }
    console.log(update);
    return update;
  },
  confirmPassword: function({ password, confirmPassword }) {
    if (password != confirmPassword) {
      return { confirmPassword: "Does not match" };
    } else return { confirmPassword: "" };
  }
};

function validateField(fieldName, fieldValues) {
  return validators[fieldName](fieldValues);
}

export default function SignUpForm({ onSubmit: submitForm, userType }) {
  let [fieldValues, setFieldValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }),
    [errorMessages, setErrorMessages] = useState({ ...fieldValues }),
    [formState, setFormState] = useState({
      isSubmittable: false,
      errorMessage: ""
    });

  const { name, email, password, confirmPassword } = fieldValues;

  console.log(userType);

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

  function onSubmitAttempt(e) {
    e.preventDefault();

    if (formIsSubmittable()) {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      })
        .then(JSON.parse)
        .then(console.log);
    }
  }

  return (
    <form onSubmit={onSubmitAttempt}>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        label={"Name"}
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Enter your name"
        helperText={errorMessages.name}
        error={!!errorMessages.name}
      />
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        label={"Email"}
        value={email}
        name="email"
        onChange={onChange}
        placeholder="Enter your email address"
        onBlur={onBlur}
        helperText={errorMessages.email}
        error={!!errorMessages.email}
      />
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        label={"Password"}
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter a password"
        helperText={errorMessages.password}
        error={!!errorMessages.password}
      />
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        label={"Confirm Password"}
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        placeholder=""
        helperText={errorMessages.confirmPassword}
        error={!!errorMessages.confirmPassword}
      />
      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign Up
      </Button>
    </form>
  );
}
