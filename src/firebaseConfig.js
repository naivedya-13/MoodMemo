import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



 const firebaseConfig = {
  apiKey: "AIzaSyBIfmg7Sh-htW6PKL0t_r4q9e9XGJhQaFA",
  authDomain: "login-5b21d.firebaseapp.com",
  projectId: "login-5b21d",
  storageBucket: "login-5b21d.appspot.com",
  messagingSenderId: "1022831120225",
  appId: "1:1022831120225:web:abdbf7c595b0b7c963ff20",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database1 = getFirestore(app);
export { auth,app,database1 };
