import React, { useState } from "react";
import Context from "./createContext";

import useCachedState from "../hooks/useCachedState";

export default function Provider({ children }) {
  const [user, setUser] = useCachedState(null, "user");

  const initialState = {
    user: user,
    setUser
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
}
