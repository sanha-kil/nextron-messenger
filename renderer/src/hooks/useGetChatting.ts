import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseDB } from '../../firebase';

export function useGetChatting(targetQuery) {
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    const docRef = collection(firebaseDB, targetQuery);
    const fbQuery = query(docRef, orderBy('createdAt', 'asc'), limit(200));

    const unsubscribe = onSnapshot(fbQuery, (querySnapshot) => {
      const target = [];

      querySnapshot.forEach((doc) => {
        target.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setLoadedData(target);
    });

    return unsubscribe;
  }, []);

  return loadedData;
}
