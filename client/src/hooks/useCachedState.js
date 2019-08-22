import { useState } from "react";
import _ from "lodash";

function cacheExists(cacheName) {
  return Boolean(window.sessionStorage.getItem(cacheName));
}

export default function useCachedState(init, cacheName) {
  // First look in sessionstorage for a property matching
  // cache name...

  if (cacheExists(cacheName)) {
    console.log("reading from cache");

    let serializedState = window.sessionStorage.getItem(cacheName);

    init = JSON.parse(serializedState);
  } else if (!init) {
    init = null;
  }

  const [state, setState] = useState(init);

  const cache = _.debounce(update => {
    window.sessionStorage.setItem(cacheName, update);
  }, 1000);

  const setStateThenCache = update => {
    setState(update);
    cache(JSON.stringify(update));
  };

  return [state, setStateThenCache];
}
