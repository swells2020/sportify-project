import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useState } from 'react';
import LocationsCarousel from './Carousel';
import { useAuth } from '../react-contexts/AuthenticationContext';
import Geocode from 'react-geocode';
import { useEffect } from 'react';

function MapContainer({ events, mapCenter }) {
  const { currentUser } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({});
  const [updatedEvents, setUpdatedEvents] = useState([]);

  useEffect(() => {
    const promises = events.map((event) => {
      return Geocode.fromAddress(event.location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          event.lat = lat;
          event.lng = lng;
          return event;
        },
        (error) => {
          console.error(error);
        }
      );
    });

    Promise.all([...promises]).then((events) => {
      setUpdatedEvents(events);
    });
  }, [events]);

  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const onSelect = (item) => {
    setSelectedLocation(item);
  };

  let zoom = 7;
  if (currentUser) {
    zoom = 13;
  }

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoom}
          center={mapCenter}
          options={{
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
        >
          {updatedEvents.map((item) => {
            return (
              <Marker
                key={item.id}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => onSelect(item)}
              />
            );
          })}
          {selectedLocation.location && (
            <InfoWindow
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              clickable={true}
              onCloseClick={() => setSelectedLocation({})}
            >
              <p>{selectedLocation.title}</p>
            </InfoWindow>
          )}
          ;
        </GoogleMap>
      </LoadScript>
      <LocationsCarousel events={events} selectedLocation={selectedLocation} />
    </>
  );
}

export default MapContainer;
