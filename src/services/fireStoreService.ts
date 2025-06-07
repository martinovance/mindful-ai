import { db } from "@/lib/firebase/firebase";
import { MoodSession } from "@/types/vapiTypes";
import { collection, addDoc } from "firebase/firestore";

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
