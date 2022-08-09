import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';
import SingleItemMap from './SingleItemMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SingleEvent() {
  const { eventId } = useParams();
  const [singleEvent, setSingleEvent] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const docRef = doc(db, 'events', eventId);
    getDoc(docRef).then((data) => {
      setSingleEvent({ ...data.data(), eventId });
    });
  }, [eventId]);
  return (
    <>
      <h2>{singleEvent.name}</h2>
      <p>Sport: {singleEvent.type}</p>
      <p>Level: {singleEvent.level}</p>
      <p>Capacity: 0/{singleEvent.capacity}</p>
      <SingleItemMap singleEvent={singleEvent} />
      <Button variant="primary" onClick={handleShow}>
        Book Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to book this event?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleEvent;
