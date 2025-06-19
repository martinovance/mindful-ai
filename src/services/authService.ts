import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { AuthTypes } from "@/types/auth";

export const LoginUserCredentials = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const CreateUserAccount = async ({
  fullName,
  email,
  password,
}: AuthTypes) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: `${fullName}`,
  });

  return userCredential.user;
};
