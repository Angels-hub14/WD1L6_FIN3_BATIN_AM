/* ANGEL MAE BATIN - DEVELOPER PORTFOLIO Custom external JavaScript */

"use strict";

/* ---------- DATA (edit these to change the page) ---------- */

// Developer details used in the hero, motto and contact list
const DEVELOPER = {
  name: "Angel Mae H. Batin",
  motto: "\"Make it simple, make it soft, make it work.\"",
  github: "Angels-hub14",
  email: "batinangelmae14@gmail.com"          // TODO: replace with your real email
};

// Navigation sections (id must match the section id in index.html)
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "philosophy", label: "Philosophy" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

// Design philosophy points (one card each)
const PHILOSOPHY = [
  { title: "Soft, not loud", text: "I pick calm sage and moss greens and let deep evergreen carry the text, so pages feel natural and stay easy to read." },
  { title: "Clarity first", text: "Every page has one clear job. I keep layouts uncluttered, use generous spacing and label buttons by what they do." },
  { title: "Built to be reused", text: "I keep CSS and JavaScript in separate files and store content in arrays and objects, so a change happens in one place." },
  { title: "Works for everyone", text: "I design mobile first, keep strong color contrast and make sure every control shows a visible focus outline." }
];

// Palette shown as swatches on the first philosophy card
const PALETTE = ["#1f3d2b", "#5c7a38", "#e4ecdc", "#f3f7ef"];

/* ---------- HELPERS ---------- */

// Shortcut for document.getElementById
const $ = (id) => document.getElementById(id);

// Inline SVG placeholder shown when an image file is missing
function placeholder(label) {
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>" +
    "<rect width='100%' height='100%' fill='#e4ecdc'/>" +
    "<text x='50%' y='50%' fill='#1f3d2b' font-family='Georgia' font-size='26' " +
    "text-anchor='middle' dominant-baseline='middle'>" + label + "</text></svg>";
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

// Swap any broken image for a placeholder that shows its file name
function setupImageFallbacks() {
  document.querySelectorAll("#profilePhoto, .project-shot").forEach((img) => {
    img.addEventListener("error", () => {
      const fileName = img.getAttribute("src").split("/").pop();
      img.src = placeholder("Missing: " + fileName);
    }, { once: true });
  });
}

/* ---------- RENDER FUNCTIONS ---------- */

// Build navbar links from SECTIONS
function renderNav() {
  $("navList").innerHTML = SECTIONS
    .map((s) => `<li class="nav-item"><a class="nav-link" href="#${s.id}">${s.label}</a></li>`)
    .join("");
}

// Fill the motto under the photo
function renderHero() {
  $("devMotto").textContent = DEVELOPER.motto;
}

// Build the philosophy cards, plus a palette row on the first card
function renderPhilosophy() {
  const swatches = PALETTE
    .map((c) => `<span style="background:${c}" title="${c}"></span>`).join("");

  $("philosophyList").innerHTML = PHILOSOPHY.map((p, i) => `
    <div class="col-md-6">
      <article class="phil-card">
        <h3>${p.title}</h3>
        <p class="mb-0">${p.text}</p>
        ${i === 0 ? `<div class="phil-swatches mt-3" aria-label="My color palette">${swatches}</div>` : ""}
      </article>
    </div>`).join("");
}

// Contact links list
function renderContactLinks() {
  $("contactLinks").innerHTML = `
    <li class="mb-2">GitHub: <a href="https://github.com/${DEVELOPER.github}" target="_blank" rel="noopener">@${DEVELOPER.github}</a></li>
    <li>Email: <a href="mailto:${DEVELOPER.email}">${DEVELOPER.email}</a></li>`;
}

/* ---------- BEHAVIOR ---------- */

// Add a subtle shadow to the navigation after scrolling
function setupNavbarShadow() {
  const navbar = document.querySelector(".portfolio-navbar");
  const updateNavbar = function () {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 30);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);
}

// Close the mobile navigation after a navigation link is selected
function setupMobileNavClose() {
  const navLinks = document.querySelectorAll(".portfolio-navbar .nav-link, .portfolio-navbar .btn-nav");
  const navbarCollapse = $("navbarContent");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse && window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}

// Enable Bootstrap scroll spy so the active section is reflected in navigation
function setupScrollSpy() {
  if (window.bootstrap && bootstrap.ScrollSpy) {
    bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: "#mainNavbar",
      offset: 100
    }).refresh();
  }
}

// Gentle entrance animation when sections enter the viewport
function setupRevealAnimation() {
  const animatedItems = document.querySelectorAll(
    ".section-title, .section-lead, .photo-card, .phil-card, .project-card, .contact-card"
  );

  if (!("IntersectionObserver" in window)) return;

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedItems.forEach(function (item) {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
}

// Validate with Bootstrap classes; no server, so show a confirmation only
function setupContactForm() {
  const form = $("contactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      $("formAlert").innerHTML = "";
      return;
    }
    const name = $("cName").value.trim();
    $("formAlert").innerHTML =
      `<div class="alert alert-success mb-0">Thanks, ${name}! Your message is ready to send.</div>`;
    form.reset();
    form.classList.remove("was-validated");
  });
}

/* ---------- START-UP ---------- */

// Run everything once the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Build the content first, so the behavior below can find the new elements
  renderNav();
  renderHero();
  renderPhilosophy();
  renderContactLinks();

  // Footer year updates automatically
  const yearElement = $("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  setupNavbarShadow();
  setupMobileNavClose();
  setupScrollSpy();
  setupRevealAnimation();
  setupContactForm();
  setupImageFallbacks();
});