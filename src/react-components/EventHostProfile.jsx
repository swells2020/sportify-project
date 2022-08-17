import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { getDocs, doc, query, collection, where } from "firebase/firestore";
import { Image, Container, Card, Row, Col } from "react-bootstrap";

function EventHostProfile({ singleEvent }) {
  const [userHost, setUserHost] = useState({});
  const [hostRating, setHostRating] = useState(0);
  useEffect(() => {
    if (singleEvent.hostUsername) {
      const q = query(
        collection(db, "users"),
        where("username", "==", singleEvent.hostUsername)
      );
      getDocs(q).then((data) => {
        data.forEach((user) => {
          setUserHost({ ...user.data(), userId: user.id });
          const userData = user.data();
          if (userData.hostRating.length) {
            let total = 0;
            userData.hostRating.forEach((rating) => {
              total += +rating.value;
            });
            const rating = total / userData.hostRating.length;
            const roundedRating = rating.toFixed(2);
            setHostRating(roundedRating);
          }
        });
      });
    }
  }, [singleEvent]);
  return (
    <>
      <Card className="mb-3 text-start">
        <Card.Header className="mb-0 text-center">Event Host</Card.Header>
        <Card.Body className="p-0">
          <Row>
            <Col style={{ maxWidth: "144px" }}>
              <Image
                rounded
                className="m-2"
                src={userHost.photoURL}
                style={{
                  width: "116px",
                  height: "116px",
                  objectFit: "cover",
                }}
              ></Image>
            </Col>
            <Col
              className="mt-2 me-3 p-0 text-center"
              style={{ fontWeight: "14px" }}
            >
              <p>{userHost.username}</p>

              <p>{userHost.hostRating}</p>
              <Link
                to={`/users/${userHost.userId}`}
                style={{ textDecoration: "none" }}
              >
                View Profile
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventHostProfile;
