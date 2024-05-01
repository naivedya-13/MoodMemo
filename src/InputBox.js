import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signinWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("done login");
        mainpage();
        toast.success(`You are logged in. Welcome!`);
      })
      .catch((error) => {
        toast.error("Failed to sign in. Please check your credentials.");
        console.error(error);
      });
  };

  function mainpage() {
    window.location.href = "./mainyt";
  }

  const CreacteAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Account created successfully!");
        mainpage();
      })
      .catch((error) => {
        toast.error("Failed to create account. Please try again.");
        console.error(error);
      });
  };

  return (
    <>
      <input
        type="email"
        name="email"
        value={email}
        id="email"
        placeholder="Email..."
        className="p-2 m-1 border border-black rounded-md shadow-md hover:bg-blue-100 font-bold"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        name="password"
        value={password}
        id="pass"
        placeholder="Password..."
        className="p-2 m-1 border border-black rounded-md shadow-md hover:bg-blue-100 font-bold"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="cursor-pointer w-52 h-14" onClick={signinWithEmail}>
        <h1 className="w-full bg-blue-400 text-white font-semibold border border-blue-500 rounded-md m-1 p-2">
          Log in
        </h1>
      </button>

      <button
        className="cursor-pointer shadow-md rounded-md border border-black hover:border-blue-400 focus:bg-blue-200 m-1 p-2"
        onClick={CreacteAccount}
      >
        <h1>Create Account</h1>
      </button>

      <ToastContainer position="top-right" theme="dark" />
    </>
  );
};

export default InputBox;
