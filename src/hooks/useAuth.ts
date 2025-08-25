import { auth } from "@/lib/firebase/firebase";
import { getIdToken, onAuthStateChanged, signOut, User } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getToken = async () => {
    if (!user) return null;
    return await getIdToken(user, false);
  };

  const getDecodedJwt = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
  };

  const isAuthenticated = async () => {
    const decoded = await getDecodedJwt();
    if (!decoded) return false;

    const { exp } = decoded as { exp: number };
    return exp > Date.now() / 1000;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return {
    user,
    authLoading,
    getToken,
    getDecodedJwt,
    isAuthenticated,
    logOut,
  };
};
