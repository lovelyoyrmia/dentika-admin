import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase-config";

export default class Authentication {
  constructor() {
    this.role = {
      ADMIN: "ADMIN",
    };
  }
  signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  updateProfileEmail = async (user, email) => {
    await updateEmail(user, email);
  };
  updateProfilePassword = async (user, password) => {
    await updatePassword(user, password);
  };
  resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
  logout = async () => {
    await auth.signOut();
  };
}
