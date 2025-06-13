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
  getCountFromServer,
  limit,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
    throw error;
  }
};

export const getUserSessions = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 5
): Promise<{
  paginatedSessions: MoodSession[];
  sessions: MoodSession[];
  total: number;
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const sessionsRef = collection(db, "sessions");

    // Get total count
    const countQuery = query(sessionsRef, where("userId", "==", userId));
    const countSnapshot = await getCountFromServer(countQuery);
    const total = countSnapshot.data().count || 0;

    // Get paginated data
    let q = query(
      sessionsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(itemsPerPage)
    );

    // Handle pagination
    let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
    if (page > 1) {
      const prevQuery = query(
        sessionsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit((page - 1) * itemsPerPage)
      );
      const prevSnapshot = await getDocs(prevQuery);
      lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1] || null;

      if (lastVisible) {
        q = query(
          sessionsRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(itemsPerPage)
        );
      }
    }

    // Execute both queries in parallel
    const [paginatedSnapshot, allSnapshot] = await Promise.all([
      getDocs(q),
      total <= 100
        ? getDocs(
            query(
              sessionsRef,
              where("userId", "==", userId),
              orderBy("createdAt", "desc")
            )
          )
        : Promise.resolve(null),
    ]);

    // Process results
    const paginatedSessions = paginatedSnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...(doc.data() as Omit<MoodSession, "id">),
        createdAt:
          doc.data().createdAt instanceof Timestamp
            ? doc.data().createdAt
            : Timestamp.fromDate(new Date()),
      })
    );

    const sessions =
      allSnapshot?.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...(doc.data() as Omit<MoodSession, "id">),
        createdAt:
          doc.data().createdAt instanceof Timestamp
            ? doc.data().createdAt
            : Timestamp.fromDate(new Date()),
      })) || [];

    return {
      paginatedSessions,
      sessions,
      total,
      lastVisible:
        paginatedSnapshot.docs[paginatedSnapshot.docs.length - 1] || null,
    };
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export interface VoiceJournal {
  userId: string;
  title: string;
  createdAt: Timestamp;
  audioUrl: string;
}

export const uploadVoiceRecording = async (
  blob: Blob,
  userId: string,
  title: string
) => {
  const storage = getStorage();
  const fileName = `${userId}_${Date.now()}.webm`;
  const audioRef = ref(storage, `recording/${fileName}`);

  await uploadBytes(audioRef, blob);
  const audioUrl = await getDownloadURL(audioRef);

  const newEntry: VoiceJournal = {
    userId,
    title,
    audioUrl,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, "voice_journal"), newEntry);
  return { ...newEntry, id: docRef.id };
};

export const fetchVoiceJournals = async (userId: string) => {
  const ref = collection(db, "voice_journals");
  const q = query(
    ref,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return (
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) || []
  );
};
