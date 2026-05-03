import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWQAEl7e5mOnDfO_TssQpVSly4zogsUeY",
  authDomain: "sudarshana-saree.firebaseapp.com",
  projectId: "sudarshana-saree",
  storageBucket: "sudarshana-saree.firebasestorage.app",
  messagingSenderId: "87471695842",
  appId: "1:87471695842:web:4aded596ead596d2cbfbbb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);