import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import LocationsCarousel from "./Carousel";
import { useAuth } from "../react-contexts/AuthenticationContext";

function MapContainer({ events, mapCenter }) {
  const { currentUser } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({});

  const mapStyles = {
    height: "50vh",
    width: "100%",
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
            gestureHandling: "greedy",
          }}
        >
          {events.map((item) => {
            return (
              <Marker
                key={item.id}
                position={{
                  lat: item.geolocation.lat,
                  lng: item.geolocation.lng,
                }}
                onClick={() => onSelect(item)}
              />
            );
          })}
          {selectedLocation.location && (
            <InfoWindow
              position={{
                lat: selectedLocation.geolocation.lat,
                lng: selectedLocation.geolocation.lng,
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
