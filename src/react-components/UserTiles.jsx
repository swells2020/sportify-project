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
        console.log(
          userArray,
          documentSnapshot.data().uid,
          userArray.includes(documentSnapshot.data().uid)
        );
        if (userArray.includes(documentSnapshot.data().uid)) {
          setCardDetails((currenDetails) => [
            ...currenDetails,
            documentSnapshot.data(),
          ]);
        }
        console.log(cardDetails);
      });
    });
  }, [userArray]);

  return (
    <Container>
      <Row>
        {cardDetails.map((user) => {
          return (
            <>
              <Card>
                <Image
                  style={{ width: "150px", height: "150px" }}
                  src={user.photoURL}
                  roundedCircle="true"
                ></Image>
                {user.username}
              </Card>
            </>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserTiles;
