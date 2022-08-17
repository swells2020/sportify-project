import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import UserContext from '../react-contexts/UserContext';
import { useContext } from 'react';
import Geocode from 'react-geocode';
import { Timestamp } from '../config/firebase';

function HostEvent() {
  const [show, setShow] = useState(false);
  const [postIsLoading, setPostIsLoading] = useState(false);
  const user = useContext(UserContext);
  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);
  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    capacity: '',
    date: '',
    level: '',
    location: '',
    tags: '',
    type: '',
    geolocation: {},
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setPostIsLoading(true);
    Geocode.fromAddress(formInput.location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        return { geolocation: { lat, lng } };
      })
      .then((geolocation) => {
        addDoc(collection(db, 'events'), {
          ...formInput,
          date: Timestamp.fromDate(new Date(formInput.date)),
          participants: [],
          geolocation: {
            lat: geolocation.geolocation.lat,
            lng: geolocation.geolocation.lng,
          },
          hostUsername: user.username,
        });
      })
      .then(() => {
        setPostIsLoading(false);
        handleClose();
      })
      
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Host an event
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Host an event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={formInput.title}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, title: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formInput.description}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Capacity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Must be a Number..."
                value={formInput.capacity}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, capacity: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formInput.date}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, date: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Level:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formInput.level}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, level: e.target.value };
                  })
                }
                required
              >
                <option>Open this select menu...</option>
                <option value="beginner">Beginner</option>
                <option value="average">Average</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.location}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, location: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tags:</Form.Label>
              <Form.Control
                type="text"
                value={formInput.tags}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, tags: e.target.value };
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Sport:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formInput.type}
                onChange={(e) =>
                  setFormInput((prev) => {
                    return { ...prev, type: e.target.value };
                  })
                }
                required
              >
                <option>Open this select menu...</option>
                <option value="Tennis">Tennis</option>
                <option value="Football">Football</option>
                <option value="Rugby">Rugby</option>
                <option value="Yoga">Yoga</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post Event{postIsLoading ?<Spinner
          className="ms-2"
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> : <></>}
          </Button>
        </Modal.Footer>
      </Modal>{' '}
    </>
  );
}

export default HostEvent;
