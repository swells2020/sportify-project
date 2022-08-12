import { useAuth, uploadAvatar } from "../react-contexts/AuthenticationContext";
import {
  Button,
  Form,
  Card,
  Modal,
  InputGroup,
  CloseButton,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useState } from "react";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [newAvatar, setNewAvatar] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleAvatarChange(e) {
    setNewAvatar(e.target.files[0]);
  }

  function handleAvatarSubmit() {
    uploadAvatar(newAvatar, currentUser);
  }

  return (
    <>
      <Button variant="primary" style={{borderRadius: "20px"}}onClick={handleShow}>
        Edit Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          Edit profile <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form onSubmit={handleAvatarSubmit}>
              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleAvatarChange}
                ></Form.Control>
              </Form.Group>
              <Button
                className="w-100 mt-4 h-38"
                type="submit"
                disabled={!newAvatar}
              >
                Submit
              </Button>
            </Form>
          </InputGroup>

          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control className="mb-3" type="username"></Form.Control>
            <Form.Label>First Name</Form.Label>
            <Form.Control className="mb-3" type="text"></Form.Control>
            <Form.Label>Last Name</Form.Label>
            <Form.Control className="mb-3" type="text"></Form.Control>
            <Form.Label>Location</Form.Label>
            <Form.Control className="mb-3" type="text"></Form.Control>
            <Form.Check
              className="mb-3"
              inline
              type="radio"
              name="group1"
              label="Male"
            />
            <Form.Check inline type="radio" name="group1" label="Female" />
            <Form.Check inline type="radio" name="group1" label="Other" />

            <Form.Label>Date of Birth</Form.Label>
            <Form.Control className="mb-3" type="date"></Form.Control>

            <Form.Label>Bio</Form.Label>
            <Form.Control className="mb-3" as="textarea" />
            <Card className="mb-3">
              <Form.Check inline label="Tennis" name="group1" type="checkbox" />
              <Form.Check
                inline
                label="Football"
                name="group1"
                type="checkbox"
              />
              <Form.Check inline label="Rugby" name="group1" type="checkbox" />
              <Form.Check
                inline
                label="Cricket"
                name="group1"
                type="checkbox"
              />
              <Form.Check inline label="Yoga" name="group1" type="checkbox" />
              <Form.Check
                inline
                label="Snow Boarding"
                name="group1"
                type="checkbox"
              />
              <Form.Check
                inline
                label="Running"
                name="group1"
                type="checkbox"
              />
              <Form.Check
                inline
                label="Cycling"
                name="group1"
                type="checkbox"
              />
            </Card>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
