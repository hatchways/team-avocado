import React, { useState } from "react";
import Context from "./createContext";

export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  const initialState = {
    user: user,
    setUser
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
}
