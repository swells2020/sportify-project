import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ScheduleList from './ScheduleList';
import PastEvents from './PastEvents';
import HostedEvents from './HostedEvents';

function ScheduleTabs({ schedule }) {
  const [key, setKey] = useState('upcoming');

  return (
    <section>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="upcoming" title="Upcoming Events">
          {schedule && <ScheduleList schedule={schedule} />}
        </Tab>
        <Tab eventKey="past" title="Past Events">
          {schedule && <PastEvents schedule={schedule} />}
        </Tab>
        <Tab eventKey="hosted" title="Hosted Events">
          <HostedEvents />
        </Tab>
      </Tabs>
    </section>
  );
}

export default ScheduleTabs;
