import { useState, useEffect, useContext } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint) {
  const [resource, setResource] = useState(null);

  async function retrieveResource() {
    setResource(await callAPI({ endpoint }));
  }

  useEffect(retrieveResource, []);

  return [resource];
}
