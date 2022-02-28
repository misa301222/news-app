import { getAuth } from 'firebase/auth';
import { createContext, useContext } from 'react'
import { auth } from '../../app/firebaseApp';
import useFirebaseAuth from '../services/AuthService';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPasswordAuth: async () => { },
  createUserWithEmailAndPasswordAuth: async () => { },
  signOut: async () => { }
} as any);

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);