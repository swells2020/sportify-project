import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useState } from 'react';
import LocationsCarousel from './Carousel';
import { useAuth } from '../react-contexts/AuthenticationContext';

function MapContainer({ events, mapCenter }) {
  const { currentUser } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({});

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
          {events.map((item) => {
            return (
              <Marker
                key={item.id}
                position={{ lat: item.location._lat, lng: item.location._long }}
                onClick={() => onSelect(item)}
              />
            );
          })}
          {selectedLocation.location && (
            <InfoWindow
              position={{
                lat: selectedLocation.location._lat,
                lng: selectedLocation.location._long,
              }}
              clickable={true}
              onCloseClick={() => setSelectedLocation({})}
            >
              <p>{selectedLocation.name}</p>
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
