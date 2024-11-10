import { useState } from "react";

type UseComponentDisabledReturn = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

// Create the custom hook
function useComponentDisabled(
  initialState: boolean = true
): UseComponentDisabledReturn {
  const [componentDisabled, setComponentDisabled] =
    useState<boolean>(initialState);

  return [componentDisabled, setComponentDisabled];
}

export default useComponentDisabled;
