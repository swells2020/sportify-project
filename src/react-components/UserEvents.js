import { Card, Image, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../react-contexts/AuthenticationContext";

const UserEvents = ({ userInfo }) => {
  const { userId } = useParams();
  const [userEvents, setUserEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getEvents(userInfo.username).then((data) => {
      console.log(data);
      setUserEvents(data);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <Container className="p-0 mt-3 text-start">
      <h3>Events</h3>

      {isLoading ? (
        <></>
      ) : (
        <>
          {userEvents.map((event) => {
            return (
              <Card className="mb-3 text-start">
                <Image
                  rounded
                  className="m-2"
                  src="https://images.unsplash.com/photo-1546466619-1c42ee80a82b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                  style={{
                    width: "116px",
                    height: "116px",
                    objectFit: "cover",
                  }}
                ></Image>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default UserEvents;
