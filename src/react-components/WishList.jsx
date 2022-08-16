import WishListCard from './WishListCard';
import { useEffect, useContext, useState } from 'react';
import UserContext from '../react-contexts/UserContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

function WishList() {
  const user = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user.wishlist) {
      user.wishlist.forEach((eventId) => {
        const docRef = doc(db, 'events', eventId);
        getDoc(docRef).then((data) => {
          setEvents((prev) => [...prev, { ...data.data(), eventId }]);
        });
      });
    }
  }, [user]);

  return <div>{events.length > 0 && <WishListCard events={events} />}</div>;
}

export default WishList;
