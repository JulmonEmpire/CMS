// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// const app = initializeApp({
//   apiKey: "AIzaSyBsBEM598X7899DKGoeAS5bAruDtW3eriU",
//   authDomain: "mcp-ms.firebaseapp.com",
//   projectId: "mcp-ms",
//   storageBucket: "mcp-ms.appspot.com",
//   messagingSenderId: "56471561180",
//   appId: "1:56471561180:web:c2b2875d27693ed6362519"
// });
const app = initializeApp({
  apiKey: "AIzaSyCzW7fmAKcdbYphUrs8mzMCqVhRFyFMmC0",
  authDomain: "mamojaki-m.firebaseapp.com",
  projectId: "mamojaki-m",
  storageBucket: "mamojaki-m.appspot.com",
  messagingSenderId: "749066552580",
  appId: "1:749066552580:web:22a5a8699b34b8072efc51",
  measurementId: "G-NG7417P3YY"
});
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };