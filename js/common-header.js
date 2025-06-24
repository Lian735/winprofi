// Header nachladen & Events setzen
(async () => {
  // Header einfügen
  const headerHTML = await fetch('/components/header.html').then(r => r.text());
  document.getElementById('header').innerHTML = headerHTML;

  // Elemente greifen
  const profile      = document.getElementById('profile');
  const profilePic   = document.getElementById('profilePic');
  const profileMenu  = document.getElementById('profileMenu');
  const authButtons  = document.getElementById('authButtons');
  const loginBtn     = document.getElementById('loginBtn');
  const regBtn       = document.getElementById('regBtn');
  const logoutBtn    = document.getElementById('logoutBtn');

  // ===== Auth-State ==========================================================
  import('/js/firebase-init.js').then(({ auth })=>{
    import('https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js').then(mod=>{
      const { onAuthStateChanged, signOut } = mod;

      onAuthStateChanged(auth, user=>{
        if (user) {
          // Bild & sichtbare Elemente
          profilePic.src = user.photoURL || 'assets/default-avatar.png';
          authButtons.classList.add('hidden');
          profile.classList.remove('hidden');
        } else {
          authButtons.classList.remove('hidden');
          profile.classList.add('hidden');
          profileMenu.classList.add('hidden');
        }
      });

      // Logout
      logoutBtn.addEventListener('click', ()=> signOut(auth));
    });
  });

  // ===== Dropdown-Toggle =====================================================
  if (profile && profilePic && profileMenu) {
    // Klick auf Profil-Icon toggelt open-Klasse auf dem Container
    profilePic.addEventListener('click', e => {
      e.stopPropagation();
      profile.classList.toggle('open');
    });
    // Klick innerhalb des Menüs verhindert Schließen
    profileMenu.addEventListener('click', e => {
      e.stopPropagation();
    });
    // Klick außerhalb schließt das Menü
    document.addEventListener('click', () => {
      profile.classList.remove('open');
    });
  }

  // ===== Gäste-Buttons =======================================================
  loginBtn .onclick = ()=> location.href = '/login.html';
  regBtn   .onclick = ()=> location.href = '/register.html';
})();