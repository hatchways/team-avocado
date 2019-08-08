import React, { useState } from "react";
import TextField from "./TextField";

import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = props => {
  const [hidden, setHidden] = useState(true);

  function toggleHidden() {
    setHidden(!hidden);
  }

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
