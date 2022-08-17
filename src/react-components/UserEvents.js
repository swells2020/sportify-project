import { Card, Image, Container, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvents } from "../react-contexts/AuthenticationContext";
import {
  BsFillGeoAltFill,
} from "react-icons/bs";

const UserEvents = ({ userInfo }) => {
  const { userId } = useParams();
  const [userEvents, setUserEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getEvents(userInfo.username).then((data) => {
      setUserEvents(data);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <Container className="p-0 mt-3 text-start" style={{marginBottom: "80px"}}>
      <h3>Events</h3>

      {isLoading ? (
        <></>
      ) : (
        <>
          {userEvents.map((event) => {
            const date = new Date(event.date.seconds * 1000);
            return (
              <Card key={event.eventId} className="mb-3 text-start">
                <Card.Header className="mb-0 text-center">
                <Link to={`/events/${event.eventId}`} style={{textDecoration: "none", color: "#000"}}>      
                  <p className="mb-0" style={{fontWeight: "bold", textDecoration: "none"}}>{event.title}</p>
                  </Link>
                </Card.Header>
                <Card.Body className="p-0">
                  <Row>
                    <Col style={{ maxWidth: "144px" }}>
                      <Image
                        rounded
                        className="m-2"
                        src={event.photoURL}
                        style={{
                          width: "116px",
                          height: "116px",
                          objectFit: "cover",
                        }}
                      ></Image>
                    </Col>
                    <Col className="mt-2 me-3 p-0 text-center" style={{fontWeight: "14px"}}><p><BsFillGeoAltFill className="mb-1" size={18} /> {event.location}</p><p>{event.level}</p><p>{event.type}</p></Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end" style={{background: "#ffffff"}}>{date.toLocaleTimeString("en-UK")},{" "}
                {date.toLocaleDateString("en-UK")}</Card.Footer>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default UserEvents;
