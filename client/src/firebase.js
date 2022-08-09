// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "video-channel-5d610.firebaseapp.com",
  projectId: "video-channel-5d610",
  storageBucket: "video-channel-5d610.appspot.com",
  messagingSenderId: "437150628888",
  appId:process.env.appId ,
  measurementId: "G-7CMW4V7XK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;