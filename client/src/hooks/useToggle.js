import { useState } from "react";

export default function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  function toggleValue() {
    setValue(!value);
  }

  return [value, toggleValue];
}
