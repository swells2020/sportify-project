import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import { useAuth } from "../react-contexts/AuthenticationContext";
import useGetDoc from "../react-hooks/useGetDoc";
import useGetDocs from "../react-hooks/useGetDocs";

import Search from "../react-components/Search";
import SportsCarousel from "../react-components/SportsCarousel";
import MapContainer from "../react-components/MapContainer";

function Home(props) {
  const { currentUser } = useAuth();
  const user = useGetDoc("users", currentUser.uid);
  const events = useGetDocs("events");

  const [mapCenter, setMapCenter] = useState({
    lat: 42.1128351,
    lng: -72.5813608,
  });

  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);

  useEffect(() => {
    if (currentUser) {
      const userData = user.getDocsData;
      const userIsLoading = user.getDocIsLoading;
      if (!userIsLoading) {
        setMapCenter(userData.location);
      }
    }
  }, [currentUser]);

  return (
    <>
      <Search setMapCenter={setMapCenter} />
      <div>{events.length}</div>
      <div>{user.location}</div>
      <SportsCarousel setEvents={"setEvents"} />
      <MapContainer mapCenter={mapCenter} events={events.getDocsData} />
    </>
  );
}

export default Home;
