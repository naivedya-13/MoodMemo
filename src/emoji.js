import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { app, auth } from "./firebaseConfig";
import closeEu from "./assets/closeeu.png"; // Importing the smile.png image
import smileImage from "./assets/smile.png";
import thumb from "./assets/thumb.png";
import teeth from "./assets/teeth.png";
import heart from "./assets/heart.png";



const db = getFirestore(app);

const Posts = () => {
  const [post, setPost] = useState(" ");
  const [moodState, setMoodState] = useState(0);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const user = auth.currentUser;

  console.log(user);

  const clearInputField = () => {
    setPost("");
  };

  const Postbtnclick = () => {
    const postBody = post;

    if (postBody && moodState) {
      addPostToDB(postBody, user);
      clearInputField();
    } else {
      console.log("not Working Bro!!");
      alert("please choose Emoji according to your mood!")
    }
  };

  useEffect(() => {
    const moodelbtn = document.getElementsByClassName("mood-emogi-btn");

    function returnMoodValueFromElementId(elementId) {
      return Number(elementId.slice(5));
    }

    function selectMood(event) {
      const selectMoodEmojiElementId = event.currentTarget.id;
      const chosenMoodValue = returnMoodValueFromElementId(
        selectMoodEmojiElementId
      );
      console.log(chosenMoodValue);
      setMoodState(chosenMoodValue);
    }

    for (let moodEmojiEl of moodelbtn) {
      moodEmojiEl.addEventListener("click", selectMood);
    }

    

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      for (let moodEmojiEl of moodelbtn) {
        moodEmojiEl.removeEventListener("click", selectMood);
      }
    };
  }, []);

  const addPostToDB = async (postBody, user) => {
    try {
      const docRef = await addDoc(collection(db, "usersPost"), {
        body: postBody,
        uid: user.uid,
        timeStempAt: serverTimestamp(),
        mood: moodState,
      });

      console.log("Document written with ID: ", docRef.id);
      // console.log(" push to db",uid);
      alert("data pushed");
    } catch (e) {
      console.log("Error adding document", e);
      alert("Something is Wrong!!")
    }
  };

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      <div>
        <div className=" ">
          <div className="flex justify-center items-center gap-4 mood-emogies">
            <button id="mood-1" className="mood-emogi-btn hover:scale-125 ">
              <img src={closeEu} alt="awful" className="w-16" />
              <h1>Bad</h1>
            </button>

            <button
              id="mood-2"
              className={`mood-emogi-btn hover:scale-125 ${
                clicked ? "clicked-style" : ""
              }`}
              onClick={handleClick}
              style={
                clicked
                  ? {
                      backgroundColor: "gray",
                      color: "white",
                      fontWeight: "bold",
                      margin: "2px",
                      padding: "2px",
                      borderRadius: "0px",
                    }
                  : {}
              }
            >
              <img src={smileImage} alt="smile" className="w-16" />
              <h1>smile</h1>
            </button>

            <button id="mood-3" className="mood-emogi-btn hover:scale-125">
              <img src={thumb} alt="thumb" className="w-20" />
              <h1>Good</h1>
            </button>

            <button id="mood-4" className="mood-emogi-btn hover:scale-125">
              <img src={teeth} alt="teeth" className="w-16" />
              <h1>Very Happy</h1>
            </button>

            <button id="mood-5" className="mood-emogi-btn hover:scale-125">
              <img src={heart} alt="heart" className="w-16" />
              <h1>Amazing</h1>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col m-2 p-2 justify-center items-center">
        <textarea
          value={post}
          placeholder="enter about your blog"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          className="border border-black w-96"
        />

        <button type="submit" onClick={Postbtnclick} className="bg-black text-white font-serif m-2 p-2 rounded-md w-72">
          {" "}
          click to Post
        </button>
       
      </div>
    </div>
  );
};

export default Posts;
