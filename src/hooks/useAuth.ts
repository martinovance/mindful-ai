import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    if (!auth.currentUser) signInAnonymously(auth);

    return unsubscribe;
  }, []);

  return user;
};
