import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useAuth } from '../react-contexts/AuthenticationContext';
import NavBar from '../react-components/NavBar';
import Header from '../react-components/Header';
import Home from '../react-components/Home';
import LogOut from '../react-components/LogOut';
import SingleEvent from '../react-components/SingleEvent';
import UserProfile from '../react-components/UserProfile';

const Authorised = (props) => {
  const { currentUser } = useAuth();


  return (
    <Container>
      <Header />
      <h1>AuthorisedApp</h1>
      <nav>
        <LogOut />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
      <NavBar />
    </Container>
  );
};

export default Authorised;
