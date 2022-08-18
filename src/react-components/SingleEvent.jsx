import { useParams, Link } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import SingleItemMap from "./SingleItemMap";
import EventHostProfile from "./EventHostProfile";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserContext from "../react-contexts/UserContext";
import { useContext } from "react";
import { useAuth } from "../react-contexts/AuthenticationContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function SingleEvent() {
  const { currentUser } = useAuth();
  const user = useContext(UserContext);
  const { eventId } = useParams();
  const [singleEvent, setSingleEvent] = useState({});
  const [show, setShow] = useState(false);
  const [booked, setBooked] = useState(false);
  const [onWishList, setOnWishList] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => {
    setBooked(false);
    setSingleEvent((prev) => {
      const filterParts = prev.participants.filter(
        (username) => username !== user.username
      );
      return {
        ...prev,
        participants: [...filterParts],
      };
    });
    const eventRef = doc(db, "events", eventId);
    updateDoc(eventRef, { participants: arrayRemove(user.username) });

    const userRef = doc(db, "users", user.userId);
    updateDoc(userRef, { events: arrayRemove(eventId) });
  };
  const handleBook = () => {
    setSingleEvent((prev) => {
      return {
        ...prev,
        participants: [...prev.participants, user.username],
      };
    });

    const eventRef = doc(db, "events", eventId);
    updateDoc(eventRef, { participants: arrayUnion(user.username) });

    const userRef = doc(db, "users", user.userId);
    updateDoc(userRef, { events: arrayUnion(eventId) });

    setShow(false);
    setBooked(true);
  };
  const handleAddToWishList = () => {
    const userRef = doc(db, "users", user.userId);
    updateDoc(userRef, { wishlist: arrayUnion(eventId) });
    setOnWishList(true);
  };

  const handleRemoveFromWishList = () => {
    const userRef = doc(db, "users", user.userId);
    updateDoc(userRef, { wishlist: arrayRemove(eventId) });
    setOnWishList(false);
  };

  useEffect(() => {
    const docRef = doc(db, "events", eventId);
    getDoc(docRef).then((data) => {
      const date = new Date(data.data().date.seconds * 1000);
      const time = date.toLocaleTimeString("en-UK");
      const timeZoneDate = date.toLocaleDateString("en-UK");
      setSingleEvent({ ...data.data(), eventId, date: timeZoneDate, time: time });
    });
    if (user) {
      setOnWishList(user.wishlist.includes(eventId));
    }
  }, [eventId, user]);

  useEffect(() => {
    if (currentUser) {
      if (user.events && user.events.includes(eventId)) {
        setBooked(true);
      }
    } else {
      setBooked(false);
    }
  }, [setSingleEvent, user, singleEvent, eventId, currentUser]);

  let button;
  if (!currentUser) {
    button = (
   
        <Button
          variant="outline-primary"
          style={{ marginBottom: "10px", width: "100%" }}
        >
          LogIn to book this event
        </Button>
      
    );
  } else if (booked) {
    button = (
      <Button
        variant="outline-primary"
        style={{ marginBottom: "10px", width: "100%" }}
        onClick={handleCancel}
      >
        Cancel your booking
      </Button>
    );
  } else if (
    Object.keys(singleEvent).length &&
    singleEvent.capacity === singleEvent.participants.length
  ) {
    button = (
      <Button
        variant="outline-primary"
        style={{ marginBottom: "10px", width: "100%" }}
        disabled
      >
        Event is fully booked
      </Button>
    );
  } else
    button = (
      <Button
        variant="outline-primary"
        onClick={handleShow}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        Book Event
      </Button>
    );
  return (
    <section className="singleMapContainer">
      {Object.keys(singleEvent).length && (
        <>
          <div
            style={{
              height: "10px",
              marginTop: "5px",
            }}
          ></div>
          <img
            src={singleEvent.photoURL}
            alt={singleEvent.title}
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ paddingTop: "10px", paddingBottom: "5px" }}>
              {singleEvent.title}
            </h2>
            {user && (
              <div>
                {onWishList ? (
                  <FaHeart
                    size={25}
                    style={{
                      color: "red",
                      marginTop: "15px",
                      marginRight: "10px",
                    }}
                    onClick={handleRemoveFromWishList}
                  />
                ) : (
                  <FaRegHeart
                    size={25}
                    style={{
                      color: "red",
                      marginTop: "15px",
                      marginRight: "10px",
                    }}
                    onClick={handleAddToWishList}
                  />
                )}
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "2px" }}>
            <p style={{ padding: "5px", marginBottom: "2px" }}>Sport: {singleEvent.type}</p>
            <p style={{ padding: "5px", marginBottom: "2px" }}>Level: {singleEvent.level}</p>
            <p style={{ padding: "5px", marginBottom: "2px" }}>
              Capacity: {singleEvent.participants.length}/{singleEvent.capacity}
            </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p style={{ padding: "2px" }}>
              Date: {singleEvent.date}
            </p>
            <p style={{ padding: "2px" }}>
              Time: {singleEvent.time}
            </p>
          </div>

          {button}
          <p>{singleEvent.description}</p>
          <SingleItemMap singleEvent={singleEvent} />
          <EventHostProfile singleEvent={singleEvent} />
        </>
      )}
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
    </section>
  );
}

export default SingleEvent;
