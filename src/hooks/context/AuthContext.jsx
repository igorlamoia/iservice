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
import { api } from '../../utils/api';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({}); // usuário atual logado no firebase
  const [logedUser, setLogedUser] = useState({}); // usuário logado no sistema
  const [isLoading, setIsLoading] = useState(false);

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
    setLogedUser({});
    // localStorage.removeItem('@iservice:firebase:uid');
  };

  const logUserInApi = async (idFirebase) => {
    try {
      setIsLoading(true);
      // const userFirebase = localStorage.getItem('@iservice:firebase:uid');
      console.log('TENTANDO LOGAR');
      console.log('userFirebase', idFirebase);
      const { data } = await api.get(
        `listar/dados-usuario?idFirebase=${idFirebase}`
      );
      // nome, cpf, email, numTelefone, dataNascimento, linkFoto, idFirebase
      console.log('MACETANDO LOGEDUSER com:', data.payload);
      setIsLoading(false);
      setLogedUser(data.payload);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // console.log('loggedUser', logedUser);

  useEffect(() => {
    // logOut();
    // logUserInApi();
    // if (currentUser?.uid) {
    //   logUserInApi(currentUser.uid);
    // }

    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // localStorage.setItem('@iservice:firebase:uid', user.uid);
      logUserInApi(user.uid);
      // {
      //   displayName: 'Igor Lamoia',
      //   email: "igorlamoia@gmail.com",
      //   photoURL: "https://lh3.googleusercontent.com/a/ALm5wu3HsoYNb38yQsyj1N_pUVVpBu5_R8R23My1-zvaA8M=s96-c",
      //   emailVerified: true
      // }
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
      logedUser,
      isLoading,
      logUserInApi,
    }),
    [currentUser, logedUser, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
