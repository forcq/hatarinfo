import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./config";

export const initializeFirebase = () => {
  getApps().length === 0 ? initializeApp(firebaseConfig) : null;
};
