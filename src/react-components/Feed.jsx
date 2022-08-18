import UserContext from "../react-contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.following) {
      console.log(user.following)
      setIsLoading(true);
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
          setIsLoading(false);
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
      {isLoading ? (
     <Container className="text-center" style={{minHeight: "1000px"}}>
        <Spinner animation="border" role="status"  style={{ marginTop: "220px", width: "100px", height: "100px"
        }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      </Container>
      ) : ( <>
      {followerEvents && <FeedCards followerEvents={followerEvents} />}
      </>)}
    </>
  );
}

export default Feed;
