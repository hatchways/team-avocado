import { useState, useEffect, useContext } from "react";
import { apiCall } from "../helpers/api";

export default function useResource(endpoint) {
  const [resource, setResource] = useState(null);

  useEffect(async () => {
    setResource(await apiCall(endpoint));
  }, []);

  return [resource];
}
