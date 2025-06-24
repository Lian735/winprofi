import { auth } from './firebase-init.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

// Registrierung
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registrierung erfolgreich!');
      window.location.href = 'login.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Login fehlgeschlagen: ' + error.message);
    }
  });
}

// Passwort zurücksetzen
const resetLink = document.getElementById('resetPasswordLink');
if (resetLink) {
  resetLink.addEventListener('click', async e => {
    e.preventDefault();
    const email = prompt("Gib deine E-Mail-Adresse ein:");
    if (!email) return;
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Passwort-Zurücksetzen-E-Mail wurde gesendet.");
    } catch (error) {
      alert("Fehler: " + error.message);
    }
  });
}

// Weiterleitung Login/Register
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
if (loginBtn)    loginBtn.onclick    = () => window.location.href = 'login.html';
if (registerBtn) registerBtn.onclick = () => window.location.href = 'register.html';

// Elemente für Header und Inhalte
const profileDiv    = document.getElementById('profile');
const profilePic    = document.getElementById('profilePic');
const profileMenu   = document.getElementById('profileMenu');
const restrictedSec = document.getElementById('restricted');
const adminSec      = document.getElementById('admin');

// Auth-State Listener
onAuthStateChanged(auth, user => {
  if (!user) {
    // nicht eingeloggt
    loginBtn?.classList.remove('hidden');
    registerBtn?.classList.remove('hidden');
    profileDiv?.classList.add('hidden');
    restrictedSec?.classList.add('hidden');
    adminSec?.classList.add('hidden');
  } else {
    // eingeloggt
    loginBtn?.classList.add('hidden');
    registerBtn?.classList.add('hidden');
    profileDiv?.classList.remove('hidden');
    restrictedSec?.classList.remove('hidden');

    // Profilbild & Alt-Text
    if (user.photoURL) {
      profilePic.src = user.photoURL;
      profilePic.alt = user.displayName || user.email;
    } else {
      profilePic.src = "assets/default-avatar.png";
      profilePic.alt = "Standard-Profilbild";
    }

    // Admin-Bereich
    const adminEmails = ["lianschuster@icloud.com"];
    if (adminEmails.includes(user.email)) {
      adminSec?.classList.remove('hidden');
    } else {
      adminSec?.classList.add('hidden');
    }
  }
});


// Logout aus dem Menü
document.getElementById('logoutBtn')?.addEventListener('click', e => {
  e.preventDefault();
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});