import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { getDocs, doc, query, collection, where } from "firebase/firestore";

function EventHostProfile({ singleEvent }) {
  const [userHost, setUserHost] = useState({});
  const [hostRating, setHostRating] = useState(0);
  useEffect(() => {
    if (singleEvent.hostUsername) {
      const q = query(
        collection(db, "users"),
        where("username", "==", singleEvent.hostUsername)
      );
      getDocs(q).then((data) => {
        data.forEach((user) => {
          setUserHost({ ...user.data(), userId: user.id });
          const userData = user.data();
          if (userData.hostRating.length) {
            let total = 0;
            userData.hostRating.forEach((rating) => {
              total += +rating.value;
            });
            const rating = total / userData.hostRating.length;
            const roundedRating = rating.toFixed(2);
            setHostRating(roundedRating);
          }
        });
      });
    }
  }, [singleEvent]);
  return (
    <>
      <img src={userHost.imageURL} alt={userHost.username} />
      <p>{userHost.username}</p>
      <p>Rating: {hostRating}</p>
      <Link to={`/users/${userHost.userId}`}>View Profile</Link>
    </>
  );
}

export default EventHostProfile;
