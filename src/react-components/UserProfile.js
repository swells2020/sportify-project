import { useAuth } from "../react-contexts/AuthenticationContext";
import {
  Image,
  Container,
  Button,
  Col,
  Row,
  Card,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState, useContext } from "react";
import EditProfile from "./EditProfile";
import UserEvents from "./UserEvents";
import UserTiles from "./UserTiles";
import UserContext from "../react-contexts/UserContext";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const user = useContext(UserContext);
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState("hello");

  function handleFollow() {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    const data = { ...userInfo };
    if (!data.followers.includes(currentUser.uid)) {
      data.followers.push(currentUser.uid);
      setUserInfo(data);
      updateDoc(docRef, data).then(() => {
        setIsLoading(false);
      });
    }
    if (!user.following.includes(data.username)) {
      const docRef = doc(db, "users", currentUser.uid);
      updateDoc(docRef, { following: arrayUnion(data.username) }).then(() => {
        setIsLoading(false);
      });
    }

    setIsLoading(false);
  }

  function handleUnfollow() {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    const data = { ...userInfo };
    if (data.followers.includes(currentUser.uid)) {
      const followerIndex = data.followers.findIndex(
        (element) => element === currentUser.uid
      );
      data.followers.splice(followerIndex, 1);
      setUserInfo(data);
      updateDoc(docRef, data).then((data) => {
        setIsLoading(false);
      });
    }
    if (user.following.includes(data.username)) {
      const docRef = doc(db, "users", currentUser.uid);
      updateDoc(docRef, { following: arrayRemove(data.username) }).then(() => {
        setIsLoading(false);
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    getDoc(docRef).then((data) => {
      setUserInfo({ ...data.data() });
      if (currentUser) {
        setUserAuth(currentUser);
      }
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <Container className="text-center" style={{ minHeight: "1000px" }}>
          <Spinner
            animation="border"
            role="status"
            style={{ marginTop: "220px", width: "100px", height: "100px" }}
          >
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

            {userInfo.followers.length == 1 ? (
              <p>{userInfo.followers.length} Follower</p>
            ) : (
              <p>{userInfo.followers.length} Followers</p>
            )}

            {userAuth.uid === userInfo.uid ? (


              <EditProfile userInfo={userInfo} />
            ) : (
              <></>
            )}
            {userInfo.bio ? <p>{userInfo.bio}</p> : <></>}

            <Container className="p-0">
              <Row>
                {currentUser && currentUser.uid != userInfo.uid && (
                  <Col>
                    {!userInfo.followers.includes(currentUser.uid) ? (
                      <Button
                        className="m-1"
                        variant="outline-primary"
                        onClick={handleFollow}
                      >
                        Follow
                      </Button>
                    ) : (
                      <Button
                        className="m-1"
                        variant="outline-primary"
                        onClick={handleUnfollow}
                      >
                        Unfollow
                      </Button>
                    )}
                  </Col>
                )}
              </Row>

              {userInfo.followers.length > 0 && (
                <>
                  <h2>Followers</h2>
                  <UserTiles userArray={userInfo.followers}></UserTiles>
                </>
              )}
            </Container>
            <UserEvents userInfo={userInfo} />
          </Container>
        </>
      )}
    </>
  );
};

export default UserProfile;
