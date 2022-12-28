// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtXFhqWMfiQ6ZMvcuVMT55E4H2giRvQFg",
  authDomain: "shortly-7b21f.firebaseapp.com",
  projectId: "shortly-7b21f",
  storageBucket: "shortly-7b21f.appspot.com",
  messagingSenderId: "363973419529",
  appId: "1:363973419529:web:fb3e60dd72cc103bbf4ed8",
  measurementId: "G-R4ESWPE96T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);