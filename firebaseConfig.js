// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbyqTUMSoEfVPpDXd4wUS_XyVgLP0mv40",
  authDomain: "hcmut-attendance.firebaseapp.com",
  projectId: "hcmut-attendance",
  databaseURL:
    "https://hcmut-attendance-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "hcmut-attendance.firebasestorage.app",
  messagingSenderId: "756729917061",
  appId: "1:756729917061:web:4b12c26d9d6d6f49f703ec",
  measurementId: "G-LN2WFDDWBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);

export default database;
