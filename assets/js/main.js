/* Manvi Jain — site behaviour: theme toggle, mobile nav, current-year stamp. */
(function () {
  "use strict";

  /* ---- theme -------------------------------------------------------- */
  var STORAGE_KEY = "mj-theme";

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode */ }
      toggle.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
    });
  }

  /* ---- mobile navigation -------------------------------------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.getElementById("nav-links");

  function isMobile() { return window.matchMedia("(max-width: 800px)").matches; }

  function setNav(open) {
    if (!navLinks || !navToggle) return;
    navLinks.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
  }

  if (navToggle && navLinks) {
    setNav(!isMobile());
    navToggle.addEventListener("click", function () {
      setNav(navLinks.hidden);
    });
    window.addEventListener("resize", function () {
      if (!isMobile()) setNav(true);
      else if (navToggle.getAttribute("aria-expanded") !== "true") setNav(false);
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && isMobile()) setNav(false);
    });
  }

  /* ---- footer year --------------------------------------------------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
