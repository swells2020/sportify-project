import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function useGetDocs(documentCollection, ...queries) {
  const [getDocsIsLoading, setGetDocsIsLoading] = useState();
  const [getDocsError, setGetDocsError] = useState();
  const [getDocsData, setGetDocsData] = useState([]);

  useEffect(() => {
    setGetDocsIsLoading(true);
    const collectionReference = collection(db, documentCollection);
    getDocs(collectionReference)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data.push({ ...documentSnapshot.data(), uid: documentSnapshot.id });
        });
        setGetDocsData(data);
        setGetDocsIsLoading(false);
      })
      .catch((error) => {
        setGetDocsError(error);
        setGetDocsIsLoading(false);
      });
  }, [documentCollection]);

  return { getDocsData, getDocsError, getDocsIsLoading };
}
