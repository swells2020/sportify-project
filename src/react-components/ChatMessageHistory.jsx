import React from "react";
import { Card, Container } from "react-bootstrap";

const ChatMessageHistory = (props) => {
  const currentUser = {
    testuid: 1,
    username: "HomerJ1956",
    email: "HomerJ1956@gmail.com",
    firstName: "Homer",
    lastName: "Simpson",
    gender: "Male",
    location: "Springfield",
    sports: ["Football", "Cricket"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: 0,
    password: "test123",
  };
  const otherUser1 = {
    testuid: 2,
    username: "BlueSteel",
    email: "BlueSteel@gmail.com",
    firstName: "Marjorie",
    lastName: "Simpson",
    gender: "Female",
    location: "Springfield",
    sports: ["Rugby", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  };
  const otherUser2 = {
    testuid: 3,
    username: "Bartman",
    email: "Bartman@gmail.com",
    firstName: "Bartholomew",
    lastName: "Simpson",
    gender: "Male",
    location: "Springfield",
    sports: ["Snowboarding", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  };

  const sampleData = [
    {
        messageId:1,
      author: otherUser1.username,
      timestamp: new Date(2022, 7, 15, 10, 0, 0),
      body: "Hello, i'm a test message",
    },
    {},
  ];

  return (
    <>
      <div>i'm the chat message history component.</div>
      <Container>
        {sampleData.forEach(message => {
            return <Card key={message.messageId}>{message.body}</Card>
        })}
      </Container>
    </>
  );
};

export default ChatMessageHistory;
