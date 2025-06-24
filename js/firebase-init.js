import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAK-9CylSe-AuNV-8NbWCBbNSxLTHD-D-Y",
  authDomain: "winprofi-81124.firebaseapp.com",
  projectId: "winprofi-81124",
  storageBucket: "winprofi-81124.firebasestorage.app",
  messagingSenderId: "346157884690",
  appId: "1:346157884690:web:b2d7b933835a50f677ffcb",
  measurementId: "G-SSNVLHFDCC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);