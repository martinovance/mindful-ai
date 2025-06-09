import { db } from "@/lib/firebase/firebase";
import { MoodSession } from "@/types/vapiTypes";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  // orderBy,
} from "firebase/firestore";

export const storeSessionData = async (session: MoodSession) => {
  try {
    const docRef = await addDoc(collection(db, "sessions"), {
      userId: session.userId,
      transcript: session.transcript,
      summary: session.summary,
      moodScore: session.moodScore,
      moodLabel: session.moodLabel,
      recommendations: session.recommendations,
      timeOfDay: session.timeOfDay,
      createdAt: session.createdAt,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw for calling code to handle
  }
};

export const getUserSessions = async (
  userId: string
): Promise<MoodSession[]> => {
  const sessionsRef = collection(db, "sessions");
  const q = query(
    sessionsRef,
    where("userId", "==", userId)
    // orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const sessions: MoodSession[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    sessions.push({
      id: doc.id,
      ...(data as Omit<MoodSession, "id">),
    });
  });

  return sessions;
};
