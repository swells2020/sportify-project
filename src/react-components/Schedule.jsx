import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useContext } from 'react';
import UserContext from '../react-contexts/UserContext';
import HostEvent from '../react-components/HostEvent';
import ScheduleTabs from './ScheduleTabs';

function Schedule() {
  const user = useContext(UserContext);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    if (user.events) {
      const eventRequests = user.events.map((event) => {
        const docRef = doc(db, 'events', event);
        return getDoc(docRef);
      });
      Promise.all(eventRequests)
        .then((data) => {
          const scheduledEvents = data.map((scheduledEvent) => {
            return { ...scheduledEvent.data(), eventId: scheduledEvent.id };
          });
          scheduledEvents.sort(function (a, b) {
            return (
              new Date(a.date.seconds * 1000) - new Date(b.date.seconds * 1000)
            );
          });

          setSchedule([...scheduledEvents]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  return (
    <>
      <ScheduleTabs schedule={schedule} />
      <HostEvent />
    </>
  );
}

export default Schedule;
