import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBj2B4hSQD8GLgi9DGAQYQLmoQohCp8uJY",
  authDomain: "vape-f0863.firebaseapp.com",
  projectId: "vape-f0863",
  storageBucket: "vape-f0863.appspot.com",
  messagingSenderId: "6671143950",
  appId: "1:6671143950:web:a7197035fdccca58cb185f",
  measurementId: "G-8X32EBWQR9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
export { storage, analytics };
