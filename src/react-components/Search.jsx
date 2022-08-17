import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Geocode from "react-geocode";
import { BsSearch } from "react-icons/bs";

function Search({ setMapCenter }) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
        setSearchTerm("");
        setShow(false);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <div>
        {isDesktop ? (
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-around",
            }}
          >
            <div style={{ width: "34%" }}>
              <h1>Sportify</h1>
            </div>
            <div className="d-grid gap-2" style={{ flexGrow: "2" }}>
              <Button
                variant="outline-primary"
                onClick={handleShow}
                style={{
                  width: "50%",
                  height: "75%",
                }}
              >
                <BsSearch style={{ marginRight: "10px" }} />
                Search location...
              </Button>
            </div>
            <div></div>
          </div>
        ) : (
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              onClick={handleShow}
              style={{ marginTop: "10px" }}
            >
              <BsSearch style={{ marginRight: "10px" }} />
              Search location...
            </Button>
          </div>
        )}
      </div>

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
