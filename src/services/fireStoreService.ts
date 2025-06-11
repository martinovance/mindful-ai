import { db } from "@/lib/firebase/firebase";
import { MoodSession } from "@/types/vapiTypes";
import { getTimeOfDay } from "@/utils/moodAnalyzer";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  // orderBy,
} from "firebase/firestore";

export const storeSessionData = async (session: MoodSession) => {
  if (
    !session.userId ||
    !session.transcript ||
    session.transcript.length === 0
  ) {
    throw new Error("Invalid session data");
  }

  try {
    const docRef = await addDoc(collection(db, "sessions"), {
      userId: session.userId,
      transcript: session.transcript,
      summary: session.summary || "No summary available",
      moodScore: session.moodScore || 5,
      moodLabel: session.moodLabel || "Neutral",
      recommendations: session.recommendations || ["No recommendations"],
      timeOfDay: session.timeOfDay || getTimeOfDay(),
      createdAt: session.createdAt || serverTimestamp(),
      status: "complete",
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
