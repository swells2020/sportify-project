import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function useGetDoc(documentCollection, documentId) {
  const [getDocIsLoading, setGetDocIsLoading] = useState();
  const [getDocError, setGetDocError] = useState();
  const [getDocData, setGetDocData] = useState([]);

  useEffect(() => {
    setGetDocIsLoading(true);
    const documentReference = doc(db, documentCollection, documentId);
    getDoc(documentReference)
      .then((documentSnapshot) => {
        setGetDocData(documentSnapshot.data());
        setGetDocIsLoading(false);
        console.log(documentSnapshot.data())
      })
      .catch((error) => {
        setGetDocError(error);
        setGetDocIsLoading(false);
      });
  }, [documentId]);

  return { getDocData, getDocError, getDocIsLoading };
}
