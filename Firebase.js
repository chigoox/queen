// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuCuoc24ETFFBSC1bBTXtEATKwXNi2N-Y",
  authDomain: "chloe-6b08f.firebaseapp.com",
  projectId: "chloe-6b08f",
  storageBucket: "chloe-6b08f.appspot.com",
  messagingSenderId: "982281584809",
  appId: "1:982281584809:web:2ee36c5984930cd28429b8",
  measurementId: "G-3XFDCV0VYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };

