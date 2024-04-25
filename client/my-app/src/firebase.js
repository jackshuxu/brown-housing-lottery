// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5drMQ3FZX8ufpxwBJp7-SO-n6SkGT_Us",
  authDomain: "brown-housing-lottery-22773.firebaseapp.com",
  projectId: "brown-housing-lottery-22773",
  storageBucket: "brown-housing-lottery-22773.appspot.com",
  messagingSenderId: "50314413134",
  appId: "1:50314413134:web:97e8dedb79636c713daf1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
