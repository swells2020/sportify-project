import MapContainer from "./MapContainer";
import SportsCarousel from "./SportsCarousel";
import Search from "./Search";
import { useState, useEffect } from "react";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import { db } from "../config/firebase";
import Geocode from "react-geocode";
import { useAuth } from "../react-contexts/AuthenticationContext";

function Home() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);
  const [mapCenter, setMapCenter] = useState({
    lat: 53.4808,
    lng: -2.2426,
  });
  useEffect(() => {
    setIsLoading(true);
    getDocs(collection(db, "events")).then((data) => {
      const eventsData = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setEvents(eventsData);
      
    });
    if (currentUser) {
      const userId = currentUser.uid;
      const docRef = doc(db, "users", userId);
      getDoc(docRef)
        .then((response) => {
          return response;
        })
        .then((response) => {
          const user = response.data();
          const address = user.location;
          Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setMapCenter({ lat, lng });
              setIsLoading(false);
            },
            (error) => {
              console.error(error);
            }
          );
        });
    } else {
      setIsLoading(false);
    }
    
  }, []);

  return (
    <>
      <Search setMapCenter={setMapCenter} />
      <SportsCarousel setEvents={setEvents} />
      {isLoading ? (
     <Container className="text-center" style={{minHeight: "1000px"}}>
        <Spinner animation="border" role="status"  style={{ marginTop: "220px", width: "100px", height: "100px"
        }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      </Container>
      ) : (
        <>
      <MapContainer mapCenter={mapCenter} events={events} />
      </>)}
    </>
  );
}

export default Home;
