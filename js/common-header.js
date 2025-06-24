// Header einfügen und Event-Logik setzen
(async () => {
  const headerEl = document.getElementById('header');
  if (!headerEl) return;
  const headerHTML = `
    <header>
      <nav class="header-nav">
        <a href="index.html" class="logo">
          <img src="assets/winprofilogo1.PNG" alt="WinProfi Logo" />
        </a>
        <div class="nav-actions">
          <div id="authButtons" class="auth-buttons">
            <a href="/login.html" class="nav-btn">Login</a>
            <a href="/register.html" class="nav-btn">Registrieren</a>
          </div>
          <div id="profile" class="profile hidden">
            <img id="profilePic" src="assets/default-avatar.png" alt="Profilbild" class="profile-pic"/>
            <div id="profileMenu" class="profile-menu">
              <a href="profile.html" class="menu-item">Mein Profil</a>
              <button id="logoutBtn" class="menu-item">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
  headerEl.innerHTML = headerHTML;

  // Elemente greifen
  const profile      = document.getElementById('profile');
  const profilePic   = document.getElementById('profilePic');
  const profileMenu  = document.getElementById('profileMenu');
  const authButtons  = document.getElementById('authButtons');
  const logoutBtn    = document.getElementById('logoutBtn');

  // Dropdown: EIN Listener auf profilePic – bleibt stabil
  profilePic.addEventListener('click', e => {
    e.stopPropagation();
    profile.classList.toggle('open');
    profileMenu.classList.toggle('hidden');
  });
  document.addEventListener('click', () => {
    profileMenu.classList.add('hidden');
    profile.classList.remove('open');
  });

  // ===== Auth-State ==========================================================
  import('/js/firebase-init.js').then(({ auth })=>{
    import('/js/firebase-auth.js').then(mod=>{
      const { onAuthStateChanged, signOut } = mod;

      onAuthStateChanged(auth, user => {
        if (user) {
          // User ist eingeloggt: Profile sichtbar, Auth-Buttons verstecken
          profilePic.src = user.photoURL || 'assets/default-avatar.png';
          authButtons.classList.add('hidden');
          profile.classList.remove('hidden');
        } else {
          // Kein User: Auth-Buttons sichtbar, Profile verstecken
          authButtons.classList.remove('hidden');
          profile.classList.add('hidden');
          profile.classList.remove('open'); // Menü sicher schließen
          profileMenu.classList.add('hidden');
        }
      });

      // Logout
      logoutBtn.addEventListener('click', ()=> signOut(auth));
    });
  });
})();