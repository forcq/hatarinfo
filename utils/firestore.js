import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { from } from "rxjs";

export const setDocument = (collectionPath, data) => {
  const db = getFirestore();
  return from(addDoc(collection(db, collectionPath), data));
};

export const getDocuments = (collectionPath, constraints) => {
  const db = getFirestore();

  const dbCollection = collection(db, collectionPath);
  const q = constraints ? query(dbCollection, ...constraints) : dbCollection;
  return from(getDocs(q));
};

export const updateDocument = (collectionPath, docID, data) => {
  const db = getFirestore();

  const docRef = doc(db, collectionPath, docID);
  return from(updateDoc(docRef, data));
};
