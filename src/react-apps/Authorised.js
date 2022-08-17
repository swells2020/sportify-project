import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../react-contexts/AuthenticationContext";
import UserContext from "../react-contexts/UserContext";
import NavBar from "../react-components/NavBar";
import Home from "../react-components/Home";
import SingleEvent from "../react-components/SingleEvent";
import UserProfile from "../react-components/UserProfile";
import Schedule from "../react-components/Schedule";
import WishList from "../react-components/WishList";
import PageNotFound from "../react-components/PageNotFound";
import Feed from "../react-components/Feed";

const Authorised = (props) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const docRef = doc(db, "users", currentUser.uid);
    getDoc(docRef).then((data) => {
      setUser({ ...data.data(), userId: currentUser.uid });
    });
  }, [currentUser]);

  return (
    <UserContext.Provider value={user}>
      <Container>
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events/:eventId" element={<SingleEvent />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <NavBar />
      </Container>
    </UserContext.Provider>
  );
};

export default Authorised;
