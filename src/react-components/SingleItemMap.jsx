import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

function SingleItemMap({ singleEvent }) {
  const [event, setEvent] = useState(false);
  const mapStyles = {
    height: "50vh",
    width: "100%",
    borderRadius: "20px",
    marginRight: "10px",
    marginBottom: "10px",
  };
  useEffect(() => {
    if (!Object.keys(singleEvent).length) {
      setEvent(false);
    } else {
      setEvent(singleEvent);
    }
  }, [singleEvent]);
  return (
    <>
      {event ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}>
          <GoogleMap
            options={{
              disableDefaultUI: true,
              gestureHandling: "greedy",
            }}
            mapContainerStyle={mapStyles}
            zoom={13}
            center={{
              lat: event.geolocation.lat,
              lng: event.geolocation.lng,
            }}
          >
            <Marker
              key={event.eventId}
              position={{
                lat: event.geolocation.lat,
                lng: event.geolocation.lng,
              }}
            />
            ;
          </GoogleMap>
        </LoadScript>
      ) : (
        <></>
      )}
    </>
  );
}

export default SingleItemMap;
