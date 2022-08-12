import { useAuth, getUserAvatar } from "../react-contexts/AuthenticationContext";
import { Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";


const UserProfile = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState ();

console.log(userInfo)

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", userId);
    getDoc(docRef).then((data) => {
      setUserInfo({ ...data.data(), userId: userId });
      getUserAvatar(data.data(), userId, setUserAvatar)
        setIsLoading(false);
    })

  }, [userId]);

  return (
    <>
    <Container className="mt-3">
    {isLoading ? <></> : <Image style={{width: "102px", height: "102px"}} src={userAvatar} roundedCircle="true"></Image>}
    </Container>
    <Container className="mt-3">
      
        <EditProfile />

    </Container>
    </>
  );
};

export default UserProfile;
