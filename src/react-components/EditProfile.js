import { useAuth, uploadAvatar } from "../react-contexts/AuthenticationContext";
import {
  Button,
  Form,
  Card,
  Modal,
  InputGroup,
  CloseButton,
} from "react-bootstrap";
import { useState } from "react";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";


const EditProfile = ({ userInfo }) => {
  const { currentUser } = useAuth();
  const [newUserInfo, setNewUserInfo] = useState(userInfo);
  const [newAvatar, setNewAvatar] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleAvatarChange(e) {
    setNewAvatar(e.target.files[0]);
  }

  function handleAvatarSubmit(e) {
    e.preventDefault();
    uploadAvatar(newAvatar, currentUser)
    .then((data) => {
      const userRef = doc(db, "users", currentUser.uid);
      updateDoc(userRef, {...userInfo, photoURL: data});
    })
  }

  function handleUsernameChange(e) {
    const newUser = { ...newUserInfo };
    newUser.username = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleGenderChange(e) {
    const newUser = { ...newUserInfo };
    newUser.gender = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleFirstNameChange(e) {
    const newUser = { ...newUserInfo };
    newUser.firstName = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleLastNameChange(e) {
    const newUser = { ...newUserInfo };
    newUser.lastName = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleLocationChange(e) {
    const newUser = { ...newUserInfo };
    newUser.location = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleDobChange(e) {
    const dates = e.target.value.split("-");
    const datified = new Date(+dates[0], +dates[1] - 1, +dates[2]);
    const newUser = { ...newUserInfo };
    newUser.DOB = Timestamp.fromDate(datified);
    setNewUserInfo(newUser);
  }

  function handleBioChange(e) {
    const newUser = { ...newUserInfo };
    newUser.bio = e.target.value;
    setNewUserInfo(newUser);
  }

  function handleSportsChange(e) {
    const newUser = { ...newUserInfo };
    const newSports = [...newUserInfo.sports];
    if (e.target.checked) {
      newSports.push(e.target.id);
      newUser.sports = newSports;
      setNewUserInfo(newUser);
    } else {
      const filteredSports = newSports.filter((sport) => sport !== e.target.id);
      newUser.sports = filteredSports;
      setNewUserInfo(newUser);
    }
  }

  function handleSubmit (e) {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.uid);
    updateDoc(userRef, {...newUserInfo})
    .then(() => {
      handleClose();
    })
  }

  return (
    <>
      <Button
        variant="primary"
        style={{ borderRadius: "20px" }}
        onClick={handleShow}
      >
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

          <Form onSubmit={handleSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="mb-3"
              type="username"
              value={newUserInfo.username}
              onChange={handleUsernameChange}
            ></Form.Control>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              value={newUserInfo.firstName}
              onChange={handleFirstNameChange}
            ></Form.Control>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              value={newUserInfo.lastName}
              onChange={handleLastNameChange}
            ></Form.Control>
            <Form.Label>Location</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              value={newUserInfo.location}
              onChange={handleLocationChange}
            ></Form.Control>
            <Form.Group>
              <Form.Check
                className="mb-3"
                inline
                type="radio"
                name="gender"
                label="Male"
                value="Male"
                checked={newUserInfo.gender === "Male"}
                onChange={handleGenderChange}
              />
              <Form.Check
                inline
                type="radio"
                name="gender"
                label="Female"
                value="Female"
                checked={newUserInfo.gender === "Female"}
                onChange={handleGenderChange}
              />
              <Form.Check
                inline
                type="radio"
                name="gender"
                label="Other"
                value="Other"
                checked={newUserInfo.gender === "Other"}
                onChange={handleGenderChange}
              />
            </Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              className="mb-3"
              type="date"
              onChange={handleDobChange}
            ></Form.Control>

            <Form.Label>Bio</Form.Label>
            <Form.Control
              className="mb-3"
              as="textarea"
              value={newUserInfo.bio}
              onChange={handleBioChange}
            />
            <Card className="mb-3">
              <Form.Group>
                <Form.Check
                  inline
                  id="Tennis"
                  label="Tennis"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Tennis")}
                />
                <Form.Check
                  inline
                  id="Football"
                  label="Football"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Football")}
                />
                <Form.Check
                  inline
                  id="Rugby"
                  label="Rugby"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Rugby")}
                />
                <Form.Check
                  inline
                  id="Cricket"
                  label="Cricket"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Cricket")}
                />
                <Form.Check
                  inline
                  id="Yoga"
                  label="Yoga"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Yoga")}
                />
                <Form.Check
                  inline
                  id="Snow Boarding"
                  label="Snow Boarding"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Snow Boarding")}
                />
                <Form.Check
                  inline
                  id="Running"
                  label="Running"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Running")}
                />
                <Form.Check
                  inline
                  id="Cycling"
                  label="Cycling"
                  name="group1"
                  type="checkbox"
                  onChange={handleSportsChange}
                  checked={newUserInfo.sports.includes("Cycling")}
                />
              </Form.Group>
            </Card>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
