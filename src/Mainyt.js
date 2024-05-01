import { useEffect, useState, useRef } from "react";
import { auth, app } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Posts from "./emoji";
import Fetch from "./fetch";

function Mainyt() {
  const [userProfilePicture, setUserProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [userName, setUsername] = useState("Champ");
  const textareaRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProfilePicture(user.photoURL || userProfilePicture);
        setUsername(user.displayName || userName);
      } else {
        setUserProfilePicture(userProfilePicture);
        setUsername(userName);
      }
    });
  }, [userProfilePicture]);

  const mainpage = () => {
    signOut(auth)
      .then(() => {
        alert("You are signing out");
        window.location.href = "/";
      })
      .catch(() => {
        alert("You can't sign out. Please check your connection.");
      });
  };

  return (
    <div  className="bg-cream-200 bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/628241/pexels-photo-628241.jpeg?auto=compress&cs=tinysrgb&w=600')` , backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <button className="bg-blue0-300 m-3" onClick={mainpage}>
        SignOut
      </button>
      <div className="flex flex-col m-10 justify-center items-center">
       
        <img
          src={userProfilePicture}
          alt="Profile"
          className="rounded-full h-20 w-20 m-2"
        />

<h1 className="font-serif text-xl font-semibold">{`hello friend , ${userName}`}</h1>
      
      </div>

       <div>
       <Posts/>
       </div>

       <div>
       <Fetch/>
       </div>
    </div>
  );
}

export default Mainyt;
