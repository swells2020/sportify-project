import { useAuth, uploadAvatar } from '../react-contexts/AuthenticationContext';
import { Button, Form, Card, Modal } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState, useRef } from 'react';



const UserProfile = () => {
    const { currentUser } = useAuth();
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [newAvatar, setNewAvatar] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function handleAvatarChange(e) {
        setNewAvatar(e.target.files[0])
    }

    function handleAvatarSubmit() {

        uploadAvatar(newAvatar, currentUser);
        
    }

    useEffect(() => {
        const docRef = doc(db, 'users', userId);
        getDoc(docRef).then((data) => {
          setUserInfo({ ...data.data(), userId: userId});
        });
      }, [userId]);

return (
    <Card>
        <Card.Body>
        <Button variant="primary" onClick={handleShow}>
          Edit Profile
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
            <Form onSubmit={handleAvatarSubmit}>
                <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleAvatarChange}>

                </Form.Control>
                </Form.Group>
                <Button className="w-100 mt-4" type="submit" disabled={!newAvatar}>Submit</Button>
            </Form>
            </Modal.Body>
            </Modal>
        </Card.Body>
    </Card>
)
}

export default UserProfile;