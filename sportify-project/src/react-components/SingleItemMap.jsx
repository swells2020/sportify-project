import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

function SingleItemMap({ singleEvent }) {
  const [event, setEvent] = useState(false);
  const mapStyles = {
    height: '50vh',
    width: '100%',
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
            }}
            mapContainerStyle={mapStyles}
            zoom={13}
            center={{
              lat: event.location._lat,
              lng: event.location._long,
            }}
          >
            <Marker
              key={event.eventId}
              position={{
                lat: event.location._lat,
                lng: event.location._long,
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
