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
  firstName,
  lastName,
  email,
  password,
}: AuthTypes) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: `${firstName} ${lastName}`,
  });

  return userCredential.user;
};
