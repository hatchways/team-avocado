import React from "react";
import useToggle from "../hooks/useToggle";
import TextField from "./TextField";

import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = props => {
  const [hidden, toggleHidden] = useToggle(true);

  return (
    <TextField
      {...props}
      type={hidden ? "password" : "text"}
      IconComponent={hidden ? FiEye : FiEyeOff}
      onClickIcon={toggleHidden}
    />
  );
};

export default PasswordInput;
