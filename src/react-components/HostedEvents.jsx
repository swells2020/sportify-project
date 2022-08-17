import { useEffect, useState, useContext } from "react";
import {
  getDocs,
  doc,
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import UserContext from "../react-contexts/UserContext";
import { db } from "../config/firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function HostedEvents({ hostedEvents, setHostedEvents }) {
  const user = useContext(UserContext);
  const currDate = ~~(+new Date() / 1000);
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleDelete = () => {
    setShow(false);
    setHostedEvents((prev) =>
      prev.filter((event) => event.id !== selectedEvent.id)
    );
    deleteDoc(doc(db, "events", selectedEvent.id));
    const q = query(
      collection(db, "users"),
      where("events", "array-contains", selectedEvent.id)
    );

    getDocs(q).then((userDocs) => {
      userDocs.forEach((user) => {
        const userRef = doc(db, "users", user.id);
        updateDoc(userRef, {
          events: arrayRemove(selectedEvent.id),
        });
      });
    });
  };

  useEffect(() => {
    if (user.events) {
      const q = query(
        collection(db, "events"),
        where("hostUsername", "==", user.username),
        orderBy("date", "desc")
      );
      getDocs(q).then((data) => {
        data.docs.forEach((hostedEvent) => {
          const eventWithId = { ...hostedEvent.data(), id: hostedEvent.id };
          setHostedEvents((prev) => {
            return [...prev, eventWithId];
          });
        });
      });
    }
  }, [user]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this event?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>
      {hostedEvents && (
        <Accordion defaultActiveKey="0">
          {hostedEvents.map((event) => {
            const date = new Date(event.date.seconds * 1000);
            return (
              <Accordion.Item eventKey={event.id} key={event.id}>
                <Accordion.Header>
                  {event.title} {date.toLocaleTimeString("en-UK")},{" "}
                  {date.toLocaleDateString("en-UK")}
                </Accordion.Header>
                <Accordion.Body>{event.description} </Accordion.Body>
                <Accordion.Body>Type: {event.type} </Accordion.Body>
                <Accordion.Body>Level: {event.level} </Accordion.Body>
                <Accordion.Body>Location: {event.location} </Accordion.Body>
                <Accordion.Body>
                  Participants: {event.participants.join(", ")}
                </Accordion.Body>
                <Accordion.Body>
                  {event.date.seconds > currDate && event.geolocation.lat && (
                    <Button variant="primary" onClick={() => handleShow(event)}>
                      Delete Event
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

export default HostedEvents;
