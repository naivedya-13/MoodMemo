import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

// import {auth} from "./firebaseConfig";

const Img = () => {
  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  function authsignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("ac sign in!!");
        window.location.href = "./mainyt";
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "accor accord");

        // ...
      });
  }

  return (
    <div>
      <button
        className="cursor-pointer shadow-md  rounded-md hover:shadow-slate-300 bg-none ml-2 mb-4"
        onClick={authsignInWithGoogle}
      >
        <img
          src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
          alt="google-img"
          className="w-52 rounded-md shadow-md "
        />
      </button>
    </div>
  );
};

export default Img;
