// Header einfügen ohne Auth-/Profil-Logik
(() => {
  const headerHTML = `
    <header>
      <nav class="header-nav">
        <a href="index.html" class="logo">
          <img src="assets/winprofilogo1.PNG" alt="WinProfi Logo" />
        </a>
      </nav>
    </header>
  `;
  document.getElementById('header').innerHTML = headerHTML;
})();