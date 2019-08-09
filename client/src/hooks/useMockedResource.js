import { useState, useEffect, useContext } from "react";

const mockData = require("../helpers/mockData.json");
console.log(mockData);

export default function useResource() {
  const [resource, setResource] = useState(null);

  useEffect(async () => {
    setTimeout(() => setResource(mockData), 2000);
  }, []);

  return [resource];
}
