// Header einfügen und Event-Logik setzen
(async () => {
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
  document.getElementById('header').innerHTML = headerHTML;

  // Elemente greifen
  const profile      = document.getElementById('profile');
  const profilePic   = document.getElementById('profilePic');
  const profileMenu  = document.getElementById('profileMenu');
  const authButtons  = document.getElementById('authButtons');
  const logoutBtn    = document.getElementById('logoutBtn');


  // ===== Auth-State ==========================================================
  import('/js/firebase-init.js').then(({ auth })=>{
    import('https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js').then(mod=>{
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
})();