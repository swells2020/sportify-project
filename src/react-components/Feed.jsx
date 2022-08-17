import UserContext from "../react-contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import {
  getDoc,
  doc,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import FeedCards from "./FeedCards";

function Feed() {
  const user = useContext(UserContext);
  const [followerEvents, setFollowerEvents] = useState([]);

  useEffect(() => {
    if (user.following) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef)
        .then((data) => {
          return data.data().following;
        })
        .then((followers) => {
          followers.forEach((follower) => {
            const q = query(
              collection(db, "events"),
              where("hostUsername", "==", follower)
            );
            getDocs(q).then((data) => {
              data.forEach((event) => {
                setFollowerEvents((prev) => [
                  ...prev,
                  { ...event.data(), eventId: event.id },
                ]);
              });
            });
          });
        });
    }
  }, [user]);

  return (
    <>
      <div
        style={{
          height: "10px",
          marginTop: "5px",
        }}
      ></div>
      {followerEvents && <FeedCards followerEvents={followerEvents} />}
    </>
  );
}

export default Feed;
