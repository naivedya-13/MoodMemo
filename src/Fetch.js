import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import closeeu from "./assets/closeeu.png";
import smile from "./assets/smile.png";
import thumb from "./assets/thumb.png";
import teeth from "./assets/teeth.png";
import heart from "./assets/heart.png";

import { database1, app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const Fetch = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchPostData = async () => {
    if (!user || !user.uid) return;

    try {
      const q = query(
        collection(database1, "usersPost"),
        where("uid", "==", user.uid),
        orderBy("timeStempAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];

      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });

      console.log("Fetched Posts:", fetchedPosts);
      if (fetchedPosts.length === 0) {
        alert("No posts yet!");
      } else {
        setPosts(fetchedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts. Please try again.");
    }
  };

  const displayDate = (firebaseDate) => {
    if (!firebaseDate) return "";
    const date = firebaseDate.toDate();
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
  };

  const getMoodImage = (mood) => {
    switch (mood) {
      case 1:
        return closeeu;
      case 2:
        return smile;
      case 3:
        return thumb;
      case 4:
        return teeth;
      case 5:
        return heart;
      default:
        return null;
    }
  };

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(database1, "usersPost", postId));
      console.log("Deleted post with ID:", postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <button
          className="bg-black w-36 h-auto p-2 m-1 border black text-white rounded text-nowrap"
          onClick={fetchPostData}
        >
          See Post
        </button>
      </div>

      <div className="posts-section m-2">
        {posts.length === 0 && <p>No posts to display.</p>}
        {posts.map((post) => (
          
          <div className="post flex flex-col gap-2 m-2 p-2 border border-black bg-cyan-200 rounded-lg shadow-lg" key={post.id}>
            <div className="header">
              <h3 className="font-mono">{displayDate(post.timeStempAt)}</h3>
              <img src={getMoodImage(post.mood)} alt={`Mood ${post.mood}` } className="w-8" />
            </div>
            <p className="font-serif mt-1">{post.body}</p>
            <button
              onClick={() => deletePost(post.id)}
              className="w-28 p-2 m-1 bg-red-300 font-serif rounded font-semibold"
            >
              Delete
            </button>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Fetch;
