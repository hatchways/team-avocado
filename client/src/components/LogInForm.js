import React, { useState, useEffect } from "react";

import TextField from "./TextField";
import PasswordInput from "./PasswordInput";
import Button from "./Button";
import { layout } from "../themes/theme";
import { callAPI } from "../helpers/api";

export default function LogInForm() {
  let [formValues, setFormValues] = useState({ email: "", password: "" }),
    [formState, setFormState] = useState({
      isSubmittable: false,
      error: ""
    });
  const { email, password } = formValues,
    { error, isSubmittable } = formState;

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
    } catch (error) {
      setFormState({ error });
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

      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign In
      </Button>
      {/* {error && <span>{console.log(error)}</span>} */}
    </form>
  );
}
