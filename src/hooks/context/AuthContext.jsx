import { createContext, useEffect, useMemo, useState, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
