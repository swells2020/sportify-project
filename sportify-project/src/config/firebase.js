import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl_jx511Y2vu7JWhg9Ypt4QQ-L6a8TGUk",
  authDomain: "sportify-project-dev.firebaseapp.com",
  projectId: "sportify-project-dev",
  storageBucket: "Ísportify-project-dev.appspot.com",
  messagingSenderId: "340906617637",
  appId: "1:340906617637:web:8f9c77e980879f4f4308cc",
  measurementId: "G-7XNVFVDC8G",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
