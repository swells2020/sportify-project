import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

function EventHostProfile({ singleEvent }) {
  const [userHost, setUserHost] = useState({});
  useEffect(() => {
    if (singleEvent.userId) {
      const docRef = doc(db, "users", singleEvent.userId);
      getDoc(docRef).then((data) => {
        setUserHost({ ...data.data(), userId: singleEvent.userId });
      });
    }
  }, [singleEvent.userId]);
  return (
    <>
      <img src={userHost.imageURL} alt={userHost.username} />
      <p>{userHost.username}</p>
      <p>Rating: {userHost.rating}</p>
      <Link to={`/users/${userHost.userId}`}>View Profile</Link>
    </>
  );
}

export default EventHostProfile;
