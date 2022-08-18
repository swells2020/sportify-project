import { collection, getDocs, snapshotEqual } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { db } from "../config/firebase";

const UserTiles = ({ userArray }) => {
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "users");
    getDocs(collectionRef).then((querySnapShot) => {
      querySnapShot.forEach((documentSnapshot) => {
        if (userArray.includes(documentSnapshot.data().uid)) {
          setCardDetails((currenDetails) => [
            ...currenDetails,
            documentSnapshot.data(),
          ]);
        }
      });
    });
  }, [userArray]);

  return (
    <Container>
      <Row>
        {cardDetails.map((user) => {
          return (
            <div key={user.uid} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around"}}>
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={user.photoURL}
                  roundedCircle="true"
                ></Image>
                {user.username}
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserTiles;
