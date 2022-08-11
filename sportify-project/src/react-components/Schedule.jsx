import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useContext } from "react";
import UserContext from "../react-contexts/UserContext";
import ScheduleList from "../react-components/ScheduleList";

function Schedule() {
  const user = useContext(UserContext);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    if (user.events) {
      user.events.forEach((event) => {
        const docRef = doc(db, "events", event);
        getDoc(docRef).then((data) => {
          setSchedule((prev) => {
            return [...prev, { ...data.data(), eventId: event }];
          });
        });
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
