import React, { createContext, useState } from "react";

export const SimulationContext = createContext();


export const SimulationContextProvider = props => {
    const [step, setStep] = useState(0);
  
    return (
      <SimulationContext.Provider value={{step, setStep}}>
        {props.children}
      </SimulationContext.Provider>
    );
};