import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase-config";
import Authentication from "./auth";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => {
    return new Authentication().signInUser(email, password);
  };
  const signOut = () => {
    return new Authentication().logout();
  };
  const updateEmail = (email) => {
    return new Authentication().updateProfileEmail(currentUser, email);
  };
  const updatePassword = (password) => {
    return new Authentication().updateProfilePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signIn,
    signOut,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
