// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg-p6zNBATT8vOpbkOrNegsmpZ5gBMOWY",
  authDomain: "descuentu-7d6be.firebaseapp.com",
  projectId: "descuentu-7d6be",
  storageBucket: "descuentu-7d6be.firebasestorage.app",
  messagingSenderId: "270817941347",
  appId: "1:270817941347:web:db296e21b5cd84a6eaa556",
  measurementId: "G-71LEDVM21B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);