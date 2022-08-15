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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const AuthenticationContext = createContext();
const storage = getStorage();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export async function uploadAvatar(newAvatar, currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  const snapshot = await uploadBytes(fileRef, newAvatar);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL: photoURL });
}

export async function getUserAvatar(user, userId) {
  if (user.photoURL) {
    const fileRef = ref(storage, userId + ".png");
    const userPhotoURL = await getDownloadURL(fileRef);
    return userPhotoURL;
  } else {
    const fileRef = ref(storage, "default-profile-icon-6.jpg");
    const userPhotoURL = await getDownloadURL(fileRef);

    console.log(userPhotoURL)
    return userPhotoURL;
  }
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
          location:location,
          email: email,
          uid: user.uid,
          sports: [],
          friends: [],
          following: [],
          events: [],
          wishlist: [],
          hostRating: [],
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
