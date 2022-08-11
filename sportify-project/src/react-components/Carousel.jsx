import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LocationsCarousel({ events, selectedLocation }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!Object.keys(selectedLocation).length) {
      setIndex(0);
    } else {
      setIndex(
        events.findIndex((event) => {
          return event.id === selectedLocation.id;
        })
      );
    }
  }, [selectedLocation]);

  return (
    <>
      <Carousel interval={null} activeIndex={index}>
        {events.map((event) => {
          return (
            <Carousel.Item
              className="event-item"
              key={event.id}
              style={{
                background: `linear-gradient(rgba(90,90,90,0.5), rgba(90,90,90,0.5)), url(${event.imageURL})`,
                height: "200px",
                backgroundSize: "cover",
                color: "#f2f4f3",
              }}
            >
              <h3>{event.title}</h3>
              <p>{event.level}</p>
              <Link to={`/events/${event.id}`}>
                <p>View event</p>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default LocationsCarousel;
