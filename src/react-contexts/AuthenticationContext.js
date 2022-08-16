import React, { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

const AuthenticationContext = createContext();
const storage = getStorage();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export async function uploadAvatar(newAvatar, currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  const snapshot = await uploadBytes(fileRef, newAvatar);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL;
}

export async function getEvents (username) {
  const q = query(collection(db, "events"), where("hostUsername", "==", username))
  const querySnapshot = await getDocs(q);
  const userEvents = []
  querySnapshot.forEach((doc) => {
      userEvents.push(doc.data());
  })
  return userEvents;
}

export function AuthenticationContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(username, firstName, lastName, location, email, password) {
    const user = {};
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const documentRef = doc(db, "users", user.uid);
        const data = {
          username: username,
          firstName: firstName,
          lastName: lastName,
          location: location,
          email: email,
          uid: user.uid,
          sports: [],
          followers: [],
          following: [],
          friends: [],
          events: [],
          wishlist: [],
          hostRating: [],
          photoURL: process.env.REACT_APP_DEFAULT_PROFILE_PICTURE,
        };
        user = data;
        return setDoc(documentRef, data);
      })
      .then(() => {
        return user;
      });
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
