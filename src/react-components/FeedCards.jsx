import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function FeedCards({ followerEvents }) {
  function toDateTime(secs) {
    var date1 = new Date();
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    var diff = new Date(t.getTime() - date1.getTime());

    var days = diff.getUTCDate() - 1;
    return days + " days time";
  }
  const currDate = ~~(+new Date() / 1000);
  const filteredEvents = followerEvents.filter((event) => {
    return event.date.seconds > currDate;
  });
  const sorted = filteredEvents.sort(function (a, b) {
    return new Date(a.date.seconds * 1000) - new Date(b.date.seconds * 1000);
  });

  return (
    <>
      {sorted.map((event) => {
        const date = new Date(event.date.seconds * 1000);
        const dateCounter = toDateTime(event.date.seconds);
        return (
          <Card key={event.eventId} style={{ marginBottom: "20px" }}>
            <Card.Header>
              {`${event.hostUsername} is hosting this events in ${dateCounter}`}
            </Card.Header>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>
                {date.toLocaleDateString("en-UK")}
                {" @ "}
                {date.toLocaleTimeString("en-UK")}
              </Card.Text>
              <Card.Title>
                {event.capacity - event.participants.length} spaces left
              </Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Link to={`/events/${event.eventId}`}>
                <Button variant="primary">View Event</Button>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}

export default FeedCards;
