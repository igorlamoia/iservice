import { createContext, useEffect, useMemo, useState, useContext } from 'react';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebase';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const googleSignIn = () => {
    console.log('google');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const facebookSignIn = () => {
    console.log('facebook');
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  const twitterSignIn = () => {
    console.log('twitter');
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      googleSignIn,
      twitterSignIn,
      facebookSignIn,
      logOut,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
