import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7b_xkaoMrhGPPL1Z66Ulu-H1_CR9qo9Y",
  authDomain: "job-portal-e4b08.firebaseapp.com",
  projectId: "job-portal-e4b08",
  storageBucket: "job-portal-e4b08.firebasestorage.app",
  messagingSenderId: "1022079041958",
  appId: "1:1022079041958:web:c7fc8e9c78baa5b4244f67",
  measurementId: "G-ELH77SS8LP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };