import { useState, useEffect } from "react";
import { callAPI } from "../helpers/api";

export default function useResource(endpoint, token) {
  const [resource, setResource] = useState(null);
  console.log(endpoint);
  useEffect(() => {
    async function retrieveResource() {
      console.log("---------");
      let config = token ? { endpoint, token } : { endpoint };
      
      console.log("config = ", config);
    
      setResource(await callAPI(config));
    }

    retrieveResource();
  }, [endpoint]);

  return [resource];
}
