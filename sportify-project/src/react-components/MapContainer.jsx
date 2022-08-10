import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useState } from 'react';
import LocationsCarousel from './Carousel';

function MapContainer({ events, mapCenter }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const onSelect = (item) => {
    setSelectedLocation(item);
  };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={mapCenter}
          options={{
            disableDefaultUI: true,
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
