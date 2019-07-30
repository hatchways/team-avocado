import React, { useState, useEffect } from "react";
import TextField from "./TextField";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import { layout } from "../themes/theme";

export default function LogInForm({ onSubmit }) {
  let [formValues, setFormValues] = useState({});

  const { email, password } = formValues;

  function onChange(e) {
    const {
      target: { name, value }
    } = e;

    setFormValues({
      [name]: value
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label={"Email"}
        value={email}
        name="email"
        onChange={e => {
          e.preventDefault();
          setFormValues({ email: e.target.value });
        }}
      />

      <TextField
        label={"Password"}
        value={password}
        onChange={e => {
          e.preventDefault();
          setFormValues({ password: e.target.value });
        }}
      />

      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign In
      </Button>
    </form>
  );
}
