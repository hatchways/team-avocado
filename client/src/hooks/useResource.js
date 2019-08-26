import { useState, useEffect } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint, token) {
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrieveResource() {
      console.log("---------");
      let config = token ? { endpoint, token } : { endpoint };

      try {
        setLoading(true);
        setResource(await callAPI(config));
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    retrieveResource();
  }, [endpoint]);

  return { resource, error, loading };
}
