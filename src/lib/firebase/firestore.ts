import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const addJournalEntry = async (uid: string, entry: string) => {
  const journalRef = collection(db, "journals");
  await addDoc(journalRef, {
    uid,
    entry,
    createdAt: Timestamp.now(),
  });
};
