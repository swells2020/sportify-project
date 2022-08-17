import { useAuth } from "../react-contexts/AuthenticationContext";
import { Image, Container, Button, Col, Row, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import UserEvents from "./UserEvents";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState('hello');

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    getDoc(docRef).then((data) => {
      setUserInfo({ ...data.data()});
      if(currentUser) {
        setUserAuth(currentUser);
      }
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <Container className="text-center">
        <Spinner animation="border" role="status" style={{ width: "150px", height: "150px" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </Container>
      ) : (
        <>
          {" "}
          <Container className="mt-3 text-center">
            <Image
              style={{ width: "150px", height: "150px" }}
              src={userInfo.photoURL}
              roundedCircle="true"
            ></Image>
          </Container>
          <Container className="mt-3 text-center p-1">
            {userInfo.firstName && userInfo.lastName ? (
              <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
            ) : (
              <></>
            )}
            <p style={{ fontWeight: "bold" }}>{`@${userInfo.username}`}</p>
            <p>{userInfo.followers.length} Followers</p>

            {userAuth.uid === userInfo.uid ? (

              <EditProfile userInfo={userInfo} />
            ) : (
              <></>
            )}
            {userInfo.bio ? <p>{userInfo.bio}</p> : <></>}
            {userAuth.uid === userInfo.uid ? (
              <></>
            ) : (
              <Container className="p-0">
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
          <UserEvents userInfo={userInfo} />
          </Container>
        </>
      )}
    </>
  );
};

export default UserProfile;
