/* eslint-disable camelcase */
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const getDecodedJwt = () => {
  try {
    const token = getToken();
    return jwtDecode(token!);
  } catch (e) {
    console.log(e);
    return {};
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const logOut = async () => {
  await signOut(auth); // <-- properly signs out from Firebase
  removeToken();
  window.location.replace("/");
};

const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt();

    const { exp } = decodedToken as { exp: number };
    const currentTime = Date.now() / 1000;

    return exp > currentTime;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const Auth = {
  isAuthenticated,
  getDecodedJwt,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  removeToken,
  logOut,
};

export default Auth;
