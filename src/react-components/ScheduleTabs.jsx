import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ScheduleList from "./ScheduleList";
import PastEvents from "./PastEvents";
import HostedEvents from "./HostedEvents";
import HostEvent from "../react-components/HostEvent";

function ScheduleTabs({ schedule }) {
  const [key, setKey] = useState("upcoming");
  const [hostedEvents, setHostedEvents] = useState([]);
  return (
    <section>
      <HostEvent setHostedEvents={setHostedEvents} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Tab eventKey="upcoming" title="Upcoming">
          {schedule && <ScheduleList schedule={schedule} />}
        </Tab>
        <Tab eventKey="past" title="Past">
          {schedule && <PastEvents schedule={schedule} />}
        </Tab>
        <Tab eventKey="hosted" title="Hosted">
          <HostedEvents
            hostedEvents={hostedEvents}
            setHostedEvents={setHostedEvents}
          />
        </Tab>
      </Tabs>
    </section>
  );
}

export default ScheduleTabs;
