import { useState, useEffect } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint, token) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    async function retrieveResource() {
      let config = token ? { endpoint, token } : { endpoint };

      console.log("config = ", config);

      setResource(await callAPI(config));
    }

    retrieveResource();
  }, [endpoint]);

  return [resource];
}
