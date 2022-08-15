import {
  useAuth,
  getUserAvatar,
} from "../react-contexts/AuthenticationContext";
import { Image, Container, Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    getDoc(docRef).then((data) => {
      setUserInfo({ ...data.data()});
      getUserAvatar(data.data(), userId)
      .then((data) => {
        setUserAvatar(data);
        setIsLoading(false);
      })
      
    });
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {" "}
          <Container className="mt-3" style={{ textAlign: "center" }}>
            <Image
              style={{ width: "150px", height: "150px" }}
              src={userAvatar}
              roundedCircle="true"
            ></Image>
          </Container>
          <Container className="mt-3" style={{ textAlign: "center" }}>
            {userInfo.firstName && userInfo.lastName ? <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2> : <></>}
            <p style={{ fontWeight: "bold" }}>{`@${userInfo.username}`}</p>
            {currentUser.uid === userInfo.uid ? <EditProfile userInfo={userInfo} /> : <></>}
            {userInfo.bio ? <p>{userInfo.bio}</p> : <></>}
            {currentUser.uid === userInfo.uid ? (
              <></>
            ) : (
              <Container>
                <Row>
                  <Col>
                    <Button className="m-1" variant="outline-primary">
                      Follow
                    </Button>
                    <Button className="m-1">Friend</Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default UserProfile;
