import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function useGetDocs(query) {
  const [onSnapshotIsLoading, setOnSnapshotIsLoading] = useState();
  const [onSnapshotError, setOnSnapshotError] = useState();
  const [onSnapshotData, setOnSnapshotData] = useState([]);

  useEffect(() => {
    setOnSnapshotIsLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data.push({ ...documentSnapshot.data(), uid: documentSnapshot.id });
        });
        setOnSnapshotData(data);
        setOnSnapshotIsLoading(false);
      },
      (error) => {
        setOnSnapshotError(error);
        setOnSnapshotIsLoading(false);
      }
    );
    return unsubscribe();
  }, [query]);

  return { onSnapshotData, onSnapshotError, onSnapshotIsLoading };
}
