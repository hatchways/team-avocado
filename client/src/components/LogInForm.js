import React, { useState } from "react";
import { layout } from "../themes/theme";
import { Link } from "react-router-dom";
import TextField from "./TextField";
import Button from "./Button";

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
        onChange={onChange}
      />

      <TextField label={"Password"} value={password} onChange={onChange} />

      <Link
        to="/password-recovery"
        style={{ display: "block", color: "inherit", fontSize: "0.75rem" }}
      >
        Forgot your password?
      </Link>

      <Button type="submit" style={{ marginTop: layout.spacing(4) }}>
        Sign In
      </Button>
    </form>
  );
}
