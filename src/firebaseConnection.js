import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwDhmUGTHMECseCDIyUyS9-dhgtJAWlik",
  authDomain: "agenda-ibav.firebaseapp.com",
  projectId: "agenda-ibav",
  storageBucket: "agenda-ibav.appspot.com",
  messagingSenderId: "755360693614",
  appId: "1:755360693614:web:305faf36af6ef65526557f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}