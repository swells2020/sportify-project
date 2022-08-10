import { useParams } from 'react-router-dom';
import {
  getDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';
import SingleItemMap from './SingleItemMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../react-contexts/UserContext';
import { useContext } from 'react';
import { useAuth } from '../react-contexts/AuthenticationContext';

function SingleEvent() {
  const { currentUser } = useAuth();
  const user = useContext(UserContext);
  const { eventId } = useParams();
  const [singleEvent, setSingleEvent] = useState({});
  const [show, setShow] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleBook = () => {
    setSingleEvent((prev) => {
      return { ...prev, currentCapacity: prev.currentCapacity + 1 };
    });

    const eventRef = doc(db, 'events', eventId);
    updateDoc(eventRef, { currentCapacity: increment(1) });

    const userRef = doc(db, 'users', user.userId);
    updateDoc(userRef, { events: arrayUnion(eventId) });

    setShow(false);
  };

  useEffect(() => {
    const docRef = doc(db, 'events', eventId);
    getDoc(docRef).then((data) => {
      setSingleEvent({ ...data.data(), eventId });
    });

    if (currentUser) {
      if (user.events && user.events.includes(eventId)) {
        setBooked(true);
      }
    }
  }, [eventId, user]);

  let button;
  if (!currentUser) {
    button = <></>;
  } else if (booked) {
    button = (
      <Button variant="primary" disabled>
        You've booked this event
      </Button>
    );
  } else if (singleEvent.capacity === singleEvent.currentCapacity) {
    button = (
      <Button variant="primary" disabled>
        Event is fully booked
      </Button>
    );
  } else
    button = (
      <Button variant="primary" onClick={handleShow}>
        Book Event
      </Button>
    );

  return (
    <>
      <h2>{singleEvent.name}</h2>
      <p>Sport: {singleEvent.type}</p>
      <p>Level: {singleEvent.level}</p>
      <p>
        Capacity: {singleEvent.currentCapacity}/{singleEvent.capacity}
      </p>
      <SingleItemMap singleEvent={singleEvent} />
      {button}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to book this event?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBook}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleEvent;
