import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import RangeSlider from 'react-bootstrap-range-slider';
import Form from 'react-bootstrap/Form';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

function PastEvents({ schedule }) {
  const currDate = ~~(+new Date() / 1000);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(3);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState(null);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (username) => {
    setUsername(username);
    setShow(true);
  };

  const handleSubmit = () => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    getDocs(q).then((data) => {
      data.forEach((user) => {
        const uid = user.data().uid;
        const userRef = doc(db, 'users', uid);
        updateDoc(userRef, { rating: arrayUnion({ value, comment }) });
      });
    });
    setShow(false);
  };

  useEffect(() => {
    if (schedule) {
      const filtered = schedule.filter((event) => {
        return event.date.seconds < currDate;
      });
      setFilteredSchedule(filtered);
    }
  }, [schedule]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your rating:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Rate the host:</Form.Label>
          <RangeSlider
            max={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Body>
          <Form.Label>Review the host:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a review..."
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Accordion defaultActiveKey="0">
        {schedule &&
          filteredSchedule.map((event) => {
            const date = new Date(event.date.seconds * 1000);
            return (
              <Accordion.Item eventKey={event.eventId} key={event.eventId}>
                <Accordion.Header>
                  {event.title} {date.toLocaleTimeString('en-UK')},{' '}
                  {date.toLocaleDateString('en-UK')}
                </Accordion.Header>
                <Accordion.Body>{event.description} </Accordion.Body>
                <Accordion.Body>Type: {event.type} </Accordion.Body>
                <Accordion.Body>Level: {event.level} </Accordion.Body>
                <Accordion.Body>Level: {event.eventId} </Accordion.Body>
                <Accordion.Body>
                  Participants: {event.participants.join(', ')}
                </Accordion.Body>
                <Accordion.Body>
                  <Button
                    variant="primary"
                    onClick={() => handleShow(event.hostUsername)}
                  >
                    Rate this event
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </>
  );
}

export default PastEvents;
