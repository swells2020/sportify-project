import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useContext } from 'react';
import UserContext from '../react-contexts/UserContext';
import ScheduleList from '../react-components/ScheduleList';

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
            return scheduledEvent.data();
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
      <h2>Your Schedule</h2>
      {schedule && <ScheduleList schedule={schedule} />}
      <h2>Past Events</h2>
    </>
  );
}

export default Schedule;
