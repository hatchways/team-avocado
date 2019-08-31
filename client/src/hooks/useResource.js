import { useState, useEffect } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint, token) {
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(endpoint);
  useEffect(() => {
    async function retrieveResource() {
      let config = token ? { endpoint, token } : { endpoint };
      console.log("what is config",config);
      try {
        setLoading(true);
        const rsc = await callAPI(config)
        console.log(rsc);
        setResource(rsc);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log("error",error);
      }
    }
    retrieveResource();
  }, [endpoint, token]);

  return { resource, error, loading };
}
