import { auth } from './firebase-init.js';
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

// Header-Elemente
const loginBtn      = document.getElementById('loginBtn');
const registerBtn   = document.getElementById('registerBtn');
const profileDiv    = document.getElementById('profile');
const profilePic    = document.getElementById('profilePic');
const profileEmail  = document.getElementById('profileEmail');
const restrictedSec = document.getElementById('restricted');

if (loginBtn)    loginBtn.onclick    = () => window.location.href = 'login.html';
if (registerBtn) registerBtn.onclick = () => window.location.href = 'register.html';

// Zugriffsschutz und dynamische Anzeige
onAuthStateChanged(auth, user => {
  if (!user) {
    loginBtn?.classList.remove('hidden');
    registerBtn?.classList.remove('hidden');
    profileDiv?.classList.add('hidden');
    restrictedSec?.classList.add('hidden');
  } else {
    loginBtn?.classList.add('hidden');
    registerBtn?.classList.add('hidden');
    profileDiv?.classList.remove('hidden');
    restrictedSec?.classList.remove('hidden');

    profileEmail.textContent = user.email || '';
    if (user.photoURL) {
      profilePic.src = user.photoURL;
      profilePic.alt = user.displayName || user.email;
    } else {
      profilePic.src = 'assets/default-avatar.png';
    }
  }
});

// Logout
document.addEventListener('click', e => {
  if (e.target.id === 'logoutBtn') {
    signOut(auth).then(() => {
      window.location.href = 'login.html';
    });
  }
});
