import { db } from "@/lib/firebase/firebase";
import { MoodSession } from "@/types/vapiTypes";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const storeSessionData = async (session: MoodSession) => {
  await addDoc(collection(db, "sessions"), {
    ...session,
    createdAt: serverTimestamp(),
  });
};
