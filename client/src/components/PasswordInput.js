import React, { useState } from "react";
import TextField from "./TextField";

const PasswordInput = props => {
  const [hidden, toggleHidden] = useState(true);

  return (
    <TextField {...props} type="password" IconComponent={<span>O</span>} />
  );
};

export default PasswordInput;
