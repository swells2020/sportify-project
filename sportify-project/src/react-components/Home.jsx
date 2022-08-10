import MapContainer from './MapContainer';
import SportsCarousel from './SportsCarousel';
import Search from './Search';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

function Home() {
  const [events, setEvents] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 53.4808,
    lng: -2.2426,
  });

  useEffect(() => {
    getDocs(collection(db, 'events')).then((data) => {
      const eventsData = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setEvents(eventsData);
    });
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
