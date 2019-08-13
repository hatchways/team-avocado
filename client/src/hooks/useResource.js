import { useState, useEffect, useContext } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint) {
  const [resource, setResource] = useState(null);

  useEffect(async () => {
    setResource(await callAPI(endpoint));
  }, []);

  return [resource];
}
