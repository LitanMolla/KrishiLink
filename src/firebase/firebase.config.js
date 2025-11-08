import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIw8oZ0F6ICoXXOnUIYhw-WnI36ytArU4",
  authDomain: "phten-4d52d.firebaseapp.com",
  projectId: "phten-4d52d",
  storageBucket: "phten-4d52d.firebasestorage.app",
  messagingSenderId: "550686052467",
  appId: "1:550686052467:web:978b5b58c1c2688a80da06"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
