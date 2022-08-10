import MapContainer from './MapContainer';
import SportsCarousel from './SportsCarousel';
import Search from './Search';
import { useState, useEffect } from 'react';
import { getDocs, getDoc, doc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import Geocode from 'react-geocode';
import { useAuth } from '../react-contexts/AuthenticationContext';

function Home() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);
  const [mapCenter, setMapCenter] = useState({
    lat: 53.4808,
    lng: -2.2426,
  });
  useEffect(() => {
    if (currentUser) {
      getDocs(collection(db, 'events')).then((data) => {
        const eventsData = data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        setEvents(eventsData);
      });

      const userId = currentUser.uid;
      const docRef = doc(db, 'users', userId);
      getDoc(docRef)
        .then((response) => {
          return response;
        })
        .then((response) => {
          const user = response.data();
          const address = user.firstLineAddress + ' ' + user.postcode;
          Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setMapCenter({ lat, lng });
            },
            (error) => {
              console.error(error);
            }
          );
        });
    }
  }, []);

  return (
    <>
      <Search setMapCenter={setMapCenter} />
      <SportsCarousel setEvents={setEvents} />
      <MapContainer mapCenter={mapCenter} events={events} />
    </>
  );
}

export default Home;
