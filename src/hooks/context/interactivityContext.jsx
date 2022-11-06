import { createContext, useMemo, useContext, useState } from 'react';

export const InteractivityContext = createContext();

export function InteractivityContextProvider({ children }) {
  const [interactivityError, setInteractivityError] = useState('');
  const [interactivitySuccess, setInteractivitySuccess] = useState('');

  const value = useMemo(
    () => ({
      interactivityError,
      setInteractivityError,
      interactivitySuccess,
      setInteractivitySuccess,
    }),
    [interactivityError, interactivitySuccess]
  );

  return (
    <InteractivityContext.Provider value={value}>
      {children}
    </InteractivityContext.Provider>
  );
}

export const useInteractivityContext = () => useContext(InteractivityContext);
