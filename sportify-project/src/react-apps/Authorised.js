import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../react-contexts/AuthenticationContext';
import UserContext from '../react-contexts/UserContext';
import NavBar from '../react-components/NavBar';
import Header from '../react-components/Header';
import Home from '../react-components/Home';
import LogOut from '../react-components/LogOut';
import SingleEvent from '../react-components/SingleEvent';

const Authorised = (props) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid);
    getDoc(docRef).then((data) => {
      setUser({ ...data.data(), userId: currentUser.uid });
    });
  }, [currentUser]);

  return (
    <UserContext.Provider value={user}>
      <Container>
        <Header />
        <h1>AuthorisedApp</h1>
        <h2>Signed in as {currentUser.email}</h2>
        <nav>
          <LogOut />
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events/:eventId" element={<SingleEvent />} />
        </Routes>
        <NavBar />
      </Container>
    </UserContext.Provider>
  );
};

export default Authorised;
