import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

function ScheduleList({ schedule }) {
  return (
    <>
      <Accordion defaultActiveKey="0">
        {schedule.map((event) => {
          const date = new Date(event.date.seconds * 1000);
          return (
            <Accordion.Item eventKey={event.eventId} key={event.eventId}>
              <Accordion.Header>
                {event.title} {date.toLocaleTimeString('en-UK')},{' '}
                {date.toLocaleDateString('en-UK')}
              </Accordion.Header>
              <Accordion.Body>{event.description} </Accordion.Body>
              <Accordion.Body>Type: {event.type} </Accordion.Body>
              <Accordion.Body>Level: {event.level} </Accordion.Body>
              <Accordion.Body>
                Participants: {event.participants.join(', ')}
              </Accordion.Body>
              <Link to={`/events/${event.eventId}`}>
                <Accordion.Body>View event page</Accordion.Body>
              </Link>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}

export default ScheduleList;
