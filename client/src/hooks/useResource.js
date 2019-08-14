import { useState, useEffect } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    async function retrieveResource() {
      setResource(await callAPI({ endpoint }));
    }

    retrieveResource();
  }, []);

  return [resource];
}
