import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj6iAuugQ-R0Rv3n6kzhyWiTWeXbErRFA",
  authDomain: "latamlite.firebaseapp.com",
  projectId: "latamlite",
  storageBucket: "latamlite.firebasestorage.app",
  messagingSenderId: "953664366731",
  appId: "1:953664366731:web:5ec3ce9c8f0aa257960c8e",
  measurementId: "G-030LG6K4HK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);