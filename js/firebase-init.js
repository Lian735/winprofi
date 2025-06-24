import { getAuth, sendPasswordResetEmail, signInWithPopup, OAuthProvider, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

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

// Passwort zurücksetzen
const resetLink = document.getElementById('resetPasswordLink');
if (resetLink) {
  resetLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = prompt("Gib deine E-Mail-Adresse ein:");
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Passwort-Zurücksetzen-E-Mail wurde gesendet.");
    } catch (error) {
      alert("Fehler beim Senden der E-Mail: " + error.message);
    }
  });
}

// Profilbild styling anwenden
const style = document.createElement('style');
style.textContent = `
  #profilePic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
document.head.appendChild(style);

// Google Login
const googleLoginBtn = document.getElementById('googleLogin');
if (googleLoginBtn) {
  const provider = new GoogleAuthProvider();
  googleLoginBtn.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = 'index.html';
    } catch (error) {
      alert("Google Login fehlgeschlagen: " + error.message);
    }
  });
}
