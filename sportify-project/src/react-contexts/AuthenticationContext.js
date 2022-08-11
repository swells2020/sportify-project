import React, { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const AuthenticationContext = createContext();
const storage = getStorage();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export async function uploadAvatar(newAvatar, currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  const snapshot = await uploadBytes(fileRef, newAvatar);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL: photoURL});
}

export function AuthenticationContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logOut() {
    return signOut(auth);
  }

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log(user)
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  });

  const value = {
    currentUser,
    signUp,
    logIn,
    resetPassword,
    logOut,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {!loading && children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;
