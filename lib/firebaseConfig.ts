import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAispC_I95lpltu9M3iI-mL_zzlOvKUdIs",
  authDomain: "mangareader-a9921.firebaseapp.com",
  projectId: "mangareader-a9921",
  storageBucket: "mangareader-a9921.appspot.com",
  messagingSenderId: "767030455551",
  appId: "1:767030455551:web:39606124cfc62eebfbb0ca",
  measurementId: "G-BX4JL2LF3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
