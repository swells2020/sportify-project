import { collection, getDocs, snapshotEqual } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
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
            <Link key={user.uid} to={`/users/${user.uid}`} className="p-2 text-center"  style={{width: "119px", height: "160px", textDecoration: "none"}}>
            <div >
            
                <Image
                className="p-2 text-center"
                  style={{ width: "100px", height: "100px" }}
                  src={user.photoURL}
                  roundedCircle="true"
                ></Image>
                <p className="mt-1" style={{textDecoration: "none", color: "#000"}}>{user.username} </p>
            
            </div>
            </Link>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserTiles;
