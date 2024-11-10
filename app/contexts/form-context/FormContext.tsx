import {
  FormContextProps,
  FormProviderProps,
  FormState,
} from "@/app/utils/interface";
import { FC, createContext, useContext, useState } from "react";

const initialFormState: FormState = {
  stage: 0,
  stages: undefined
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const setFormStage = (stage: number) => {
    setFormState((prevState) => ({ ...prevState, stage }));
  };

  const contextValue: FormContextProps = {
    formState,
    setFormStage,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
