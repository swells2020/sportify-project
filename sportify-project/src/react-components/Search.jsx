import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Geocode from 'react-geocode';

function Search({ setMapCenter }) {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSearch = (searchTerm) => {
    Geocode.fromAddress(searchTerm).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMapCenter({ lat, lng });
        setSearchTerm('');
        setShow(false);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Search...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search by location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Search..."
            onChange={(e) => handleChange(e)}
            value={searchTerm}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSearch(searchTerm)}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Search;
