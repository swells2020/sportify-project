import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function WishListCard({ events }) {
  return (
    <div>
      {events.map((event) => {
        return (
          <Card
            key={event.eventId}
            style={{ width: "100%", marginTop: "10px" }}
          >
            <Card.Img variant="top" src={event.photoURL} />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Link to={`/events/${event.eventId}`}>
                <Button variant="outline-primary">View event</Button>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default WishListCard;
