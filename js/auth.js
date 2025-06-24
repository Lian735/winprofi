import { auth } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Registrierung
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('username').value.trim();
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
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Login fehlgeschlagen: ' + error.message);
    }
  });
}

// Zugriffsschutz Index
if (window.location.pathname.includes('index.html')) {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      document.body.insertAdjacentHTML(
        'afterbegin',
        `<p>Eingeloggt als <strong>${user.email}</strong> <button id="logoutBtn">Logout</button></p>`
      );
    }
  });
}

// Logout
document.addEventListener('click', e => {
  if (e.target.id === 'logoutBtn') {
    signOut(auth).then(() => {
      window.location.href = 'login.html';
    });
  }
});
