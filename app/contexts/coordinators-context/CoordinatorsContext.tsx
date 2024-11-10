import React, { createContext, ReactNode, useContext, useState } from "react";

type CoordinatorsState = "Coordinators" | "Coordinators_Record";

interface CoordinatorsContextProps {
  state: CoordinatorsState;
  toggleState: (stateValue: CoordinatorsState) => void;
}

const CoordinatorsContext = createContext<CoordinatorsContextProps | undefined>(
  undefined
);

const useCoordinators = (): CoordinatorsContextProps => {
  const context = useContext(CoordinatorsContext);
  if (context === undefined) {
    throw new Error("useCoordinators must be used within a CoordinatorsProvider");
  }
  return context;
};

interface CoordinatorsProviderProps {
  children: ReactNode;
}

const CoordinatorsProvider: React.FC<CoordinatorsProviderProps> = ({ children }) => {
  const [state, setState] = useState<CoordinatorsState>("Coordinators");

  const toggleState = (stateValue: CoordinatorsState) => {
    setState(stateValue);
  };

  return (
    <CoordinatorsContext.Provider value={{ state, toggleState }}>
      {children}
    </CoordinatorsContext.Provider>
  );
};

export { CoordinatorsProvider, useCoordinators };
