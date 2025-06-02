import Api from "@/utils/api";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const CreateUserAccount = async (email: string, password: string) => {
  const data = await Api.post(`/accounts:signUp?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });

  return data;
};

export const LoginUserCredentials = async (email: string, password: string) => {
  const data = await Api.post(`/accounts:signInWithPassword?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  });

  return data;
};
