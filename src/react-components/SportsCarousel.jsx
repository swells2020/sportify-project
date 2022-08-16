import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsRugby,
  MdSportsCricket,
  MdSelfImprovement,
  MdSnowboarding,
  MdOutlineDirectionsRun,
  MdOutlineDirectionsBike,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';

function SportsCarousel({ setEvents }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClick = (sport) => {
    const q = query(collection(db, 'events'), where('type', '==', sport));

    getDocs(q).then((data) => {
      const eventsData = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setEvents(eventsData);
    });
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Carousel.Item key={0}>
        <div className="carousel-sport">
          <div>
            <MdOutlineKeyboardArrowLeft size={30} />
          </div>
          <div onClick={() => handleClick('Tennis')}>
            <MdSportsTennis size={30} />
          </div>
          <div onClick={() => handleClick('Tootball')}>
            <MdSportsSoccer size={30} />
          </div>
          <div onClick={() => handleClick('Rugby')}>
            <MdSportsRugby size={30} />
          </div>
          <div onClick={() => handleClick('Cricket')}>
            <MdSportsCricket size={30} />
          </div>
          <div>
            <MdOutlineKeyboardArrowRight size={30} />
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item key={1}>
        <div className="carousel-sport">
          <div>
            <MdOutlineKeyboardArrowLeft size={30} />
          </div>
          <div onClick={() => handleClick('Yoga')}>
            <MdSelfImprovement size={30} />
          </div>
          <div onClick={() => handleClick('Snowboarding')}>
            <MdSnowboarding size={30} />
          </div>
          <div onClick={() => handleClick('Running')}>
            <MdOutlineDirectionsRun size={30} />
          </div>
          <div onClick={() => handleClick('Cycling')}>
            <MdOutlineDirectionsBike size={30} />
          </div>
          <div>
            <MdOutlineKeyboardArrowRight size={30} />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default SportsCarousel;
