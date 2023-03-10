// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyBsBEM598X7899DKGoeAS5bAruDtW3eriU",
  authDomain: "mcp-ms.firebaseapp.com",
  projectId: "mcp-ms",
  storageBucket: "mcp-ms.appspot.com",
  messagingSenderId: "56471561180",
  appId: "1:56471561180:web:c2b2875d27693ed6362519"
});
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };