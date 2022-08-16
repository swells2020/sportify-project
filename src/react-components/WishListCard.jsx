import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function WishListCard({ events }) {
  return (
    <div>
      {events.map((event) => {
        return (
          <Card key={event.eventId} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Link to={`/events/${event.eventId}`}>
                <Button variant="primary">View event</Button>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default WishListCard;
