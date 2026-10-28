/* =====================================================================
   1. CENTRAL CONFIG — edit everything about you here.
   Anything left empty ("") or as an empty array is hidden automatically.
   All values below are SAMPLE placeholders. Replace them with real ones.
   ===================================================================== */
const CONFIG = {
  name: "Anjana Sathyan",
  initials: "AS",
  title: "Data Analyst",
  roles: ["Data Analyst", "Database Developer", "SQL Enthusiast"], // animated role text
  greeting: "Hi, I'm Anjana Sathyan.",
  headline: "Turning data into meaningful insights and smarter decisions.",
  description: "I am a B.Com graduate pursuing Data Analytics, with an interest in data visualization and data-driven decision-making. I use Python, SQL, Excel, Power BI, and Tableau to analyze data and communicate meaningful insights",
  availability: "Open to Data Analyst Opportunities", // "" to hide badge
  profileImage: "",      // e.g. "assets/images/profile.jpg" ; empty shows initials placeholder
  resume: "",            // e.g. "assets/resume.pdf" ; empty hides the button

  about: [
    "I am a B.Com graduate with a foundation in commerce, finance, and accounting. My interest in understanding business performance and solving problems through data led me to pursue Data Analytics.",
    "I am developing my skills in data cleaning, analysis, SQL querying, dashboard development, and data visualization using Python, Excel, Power BI, and Tableau. My goal is to combine my commerce background with analytical thinking to help organizations make informed, data-driven decisions."
  ],
  focus: { title: "Areas of focus", items: ["Data Analysis", "Data Visualization", "SQL and Database Queries", "Dashboard Development"] },
  stats: [], // only add verifiable numbers, e.g. { value: "3+", label: "Years of experience" }

  skills: [
    { category: "Programming and Data Analysis", icon: "code", items: ["Python", "Pandas", "NumPy", "Data Cleaning", "Exploratory Data Analysis"] },
    { category: "Databases", icon: "database", items: ["SQL", "Database Queries", "Data Filtering", "Data Aggregation"] },
    { category: "Data Visualization", icon: "charts", items: ["Power BI", "Tableau","Microsoft Excel"] },
    { category: "Tools and platforms", icon: "wrench", items: ["Git", "GitHub", "VS Code", "Figma"] }
  ],

  // category must match a filter; filters are built automatically.
  projects: [
    { title: "Sample Project One", category: "Web Development", image: "", description: "Short description of the problem this project solves.",
      stack: ["JavaScript", "Tailwind CSS"], features: ["Key feature or outcome"], live: "https://example.com", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", image: "", description: "Short description of what you analysed and what you found.",
      stack: ["Python", "Pandas"], features: ["Key feature or outcome"], live: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", image: "", description: "Short description of the model or experiment.",
      stack: ["Python", "scikit-learn"], features: ["Key feature or outcome"], live: "", code: "", caseStudy: "" }
  ],

  experience: [
    { role: "Sample Role", org: "Sample Company", start: "Month YYYY", end: "Present", type: "Work",
      points: ["Describe a real responsibility or achievement."], tech: ["Technology"] },
    { role: "Sample Degree", org: "Sample University", start: "YYYY", end: "YYYY", type: "Education",
      points: ["Relevant coursework or achievement."], tech: [] }
  ],

  achievements: [ // [] hides the whole section
    { title: "Sample Certification", issuer: "Issuer name", year: "YYYY", icon: "award" }
  ],

  contact: { // empty string = card hidden. Use international format for phone/WhatsApp.
    email: "anjanasathyan20@gmail.com",
    phone: "7560875943",
    whatsapp: "7560875943",                 // digits only, with country code, no + or spaces
    whatsappMessage: "Hi! I found your portfolio and would like to connect.",
    linkedin: "https://www.linkedin.com/in/anjana-sathyan- ",
    github: "https://github.com/your-handle",
    instagram: "",
    location: "Calicut, Kerala"
  },

  nav: [["Home", "#home"], ["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"]]
};

/* =====================================================================
   2. HELPERS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ext = 'target="_blank" rel="noopener noreferrer"';
const icon = (name, cls = "h-5 w-5") => `<i data-lucide="${name}" class="${cls}"></i>`;
const refreshIcons = () => window.lucide && window.lucide.createIcons();

/* =====================================================================
   3. RENDERERS
   ===================================================================== */
function socialLinks() {
  const c = CONFIG.contact;
  return [
    [c.github, "github", "GitHub"], [c.linkedin, "linkedin", "LinkedIn"], [c.instagram, "instagram", "Instagram"]
  ].filter(([url]) => url).map(([url, ic, label]) =>
    `<li><a class="social-link" href="${esc(url)}" ${ext} aria-label="${label} (opens in new tab)">${icon(ic)}</a></li>`).join("");
}

function renderStatic() {
  document.title = `${CONFIG.name} — ${CONFIG.title} Portfolio`;
  $("#brand").innerHTML = `${esc(CONFIG.initials)}<span class="accent">.</span>`;
  $("#hero-greeting").textContent = CONFIG.greeting;
  $("#hero-headline").textContent = CONFIG.headline;
  $("#hero-description").textContent = CONFIG.description;
  $("#footer-name").textContent = CONFIG.name;
  $("#footer-copy-name").textContent = CONFIG.name;

  const av = $("#hero-availability");
  CONFIG.availability ? ($("[data-text]", av).textContent = CONFIG.availability) : av.remove();

  const img = $("#hero-image");
  if (CONFIG.profileImage) { img.src = CONFIG.profileImage; img.alt = `Portrait of ${CONFIG.name}`; }
  else {
    img.replaceWith(Object.assign(document.createElement("div"), {
      className: "flex h-full w-full items-center justify-center font-heading text-7xl font-bold accent",
      textContent: CONFIG.initials
    }));
  }

  const links = (cls) => CONFIG.nav.map(([l, h]) => `<li><a class="${cls}" href="${h}" data-nav>${l}</a></li>`).join("");
  $("#nav-desktop").innerHTML = links("nav-link");
  $("#nav-mobile").innerHTML = links("nav-link");
  $("#nav-footer").innerHTML = CONFIG.nav.map(([l, h]) => `<li><a class="hover:text-[var(--text)]" href="${h}">${l}</a></li>`).join("");
  $("#hero-socials").innerHTML = socialLinks();
  $("#footer-socials").innerHTML = socialLinks();
  $("#year").textContent = new Date().getFullYear();

  // About
  $("#about-text").innerHTML = CONFIG.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#about-stats").innerHTML = CONFIG.stats.map((s) =>
    `<div class="card p-4"><p class="font-heading text-3xl font-bold accent">${esc(s.value)}</p><p class="text-sm text-muted">${esc(s.label)}</p></div>`).join("");
  const f = CONFIG.focus;
  f && f.items.length ? ($("#about-focus").innerHTML = `<h3 class="mb-3 font-heading font-semibold">${esc(f.title)}</h3><ul class="space-y-2 text-sm text-muted">${f.items.map((i) => `<li class="flex gap-2">${icon("check", "mt-0.5 h-4 w-4 shrink-0 accent")}${esc(i)}</li>`).join("")}</ul>`) : $("#about-focus").remove();
  const rb = $("#resume-btn");
  CONFIG.resume ? rb.setAttribute("href", CONFIG.resume) : rb.remove();

  // Skills
  $("#skills-grid").innerHTML = CONFIG.skills.map((g) => `
    <div class="card reveal p-5">
      <div class="mb-4 flex items-center gap-3"><span class="accent">${icon(g.icon || "code")}</span><h3 class="font-heading font-semibold">${esc(g.category)}</h3></div>
      <div class="flex flex-wrap gap-2">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div>
    </div>`).join("");

  // Timeline
  $("#timeline").innerHTML = CONFIG.experience.map((e) => `
    <li class="timeline-item reveal"><div class="card p-5">
      <p class="text-xs text-muted">${esc(e.start)} – ${esc(e.end)} · ${esc(e.type)}</p>
      <h3 class="mt-1 font-heading text-lg font-semibold">${esc(e.role)}</h3>
      <p class="text-sm accent">${esc(e.org)}</p>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${e.tech.length ? `<div class="mt-3 flex flex-wrap gap-2">${e.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
    </div></li>`).join("");

  // Achievements
  if (CONFIG.achievements.length) {
    $("#achievements-grid").innerHTML = CONFIG.achievements.map((a) => `
    <div class="card reveal flex items-start gap-4 p-5"><span class="accent">${icon(a.icon || "award", "h-6 w-6")}</span>
    <div><h3 class="font-heading font-semibold">${esc(a.title)}</h3><p class="text-sm text-muted">${esc(a.issuer)}${a.year ? ` · ${esc(a.year)}` : ""}</p></div></div>`).join("");
  } else {
    $("#achievements").remove();
  }
}

function renderProjects() {
  const cats = ["All", ...new Set(CONFIG.projects.map((p) => p.category))];
  $("#project-filters").innerHTML = cats.length > 2
    ? cats.map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "";

  $("#projects-grid").innerHTML = CONFIG.projects.map((p) => {
    const links = [
      p.live && `<a class="text-link" href="${esc(p.live)}" ${ext}>${icon("external-link", "h-4 w-4")}Live demo</a>`,
      p.code && `<a class="text-link" href="${esc(p.code)}" ${ext}>${icon("code", "h-4 w-4")}Source code</a>`,
      p.caseStudy && `<a class="text-link" href="${esc(p.caseStudy)}" ${ext}>${icon("book-open", "h-4 w-4")}Case study</a>`
    ].filter(Boolean).join("");
    return `
    <article class="card project-card reveal flex flex-col overflow-hidden" data-category="${esc(p.category)}">
      <div class="project-thumb">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="400">` : ""}</div>
      <div class="flex flex-1 flex-col p-5">
        <h3 class="font-heading text-lg font-semibold">${esc(p.title)}</h3>
        <p class="mt-2 text-sm text-muted">${esc(p.description)}</p>
        ${p.features && p.features.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="mt-4 flex flex-wrap gap-2">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        ${links ? `<div class="mt-5 flex flex-wrap gap-4 pt-1">${links}</div>` : ""}
      </div>
    </article>`;
  }).join("");
}

function renderContact() {
  const c = CONFIG.contact;
  const cards = [
    c.email && { ic: "mail", label: "Email", sub: c.email, href: `mailto:${c.email}` },
    c.phone && { ic: "phone", label: "Phone", sub: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` },
    c.whatsapp && { ic: "message-circle", label: "WhatsApp", sub: "Chat directly", ext: true,
      href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}${c.whatsappMessage ? `?text=${encodeURIComponent(c.whatsappMessage)}` : ""}` },
    c.linkedin && { ic: "linkedin", label: "LinkedIn", sub: "Connect professionally", href: c.linkedin, ext: true },
    c.github && { ic: "github", label: "GitHub", sub: "Browse my code", href: c.github, ext: true },
    c.instagram && { ic: "instagram", label: "Instagram", sub: "Follow along", href: c.instagram, ext: true },
    c.location && { ic: "map-pin", label: "Location", sub: c.location }
  ].filter(Boolean);

  $("#contact-grid").innerHTML = cards.map((k) => {
    const inner = `<span class="accent">${icon(k.ic, "h-6 w-6")}</span><div class="min-w-0"><p class="font-heading font-semibold">${esc(k.label)}</p><p class="truncate text-sm text-muted">${esc(k.sub)}</p></div>`;
    const cls = "card reveal flex items-center gap-4 p-5";
    return k.href ? `<a class="${cls}" href="${esc(k.href)}" ${k.ext ? ext : ""}>${inner}</a>` : `<div class="${cls}">${inner}</div>`;
  }).join("");
}

/* =====================================================================
   4. BEHAVIOUR
   ===================================================================== */
function initTheme() {
  const root = document.documentElement, btn = $("#theme-toggle");
  const sync = () => btn.setAttribute("aria-label", root.classList.contains("light") ? "Switch to dark theme" : "Switch to light theme");
  sync();
  btn.addEventListener("click", () => {
    root.classList.toggle("light");
    try { localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark"); } catch (e) {}
    sync();
  });
}

function initMenu() {
  const btn = $("#menu-toggle"), menu = $("#mobile-menu"), header = $("#site-header");
  const set = (open) => {
    menu.classList.toggle("hidden", !open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    btn.innerHTML = icon(open ? "x" : "menu");
    refreshIcons();
  };
  btn.addEventListener("click", () => set(menu.classList.contains("hidden")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", (e) => { if (!header.contains(e.target)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.classList.contains("hidden")) { set(false); btn.focus(); } });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (m) => m.matches && set(false));
}

function initActiveNav() {
  const links = $$("[data-nav]");
  const sections = [...new Set(links.map((l) => l.getAttribute("href")))].map((h) => $(h)).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => {
        const on = l.getAttribute("href") === `#${en.target.id}`;
        l.classList.toggle("active", on);
        on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}

function initReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return items.forEach((i) => i.classList.add("in"));
  const io = new IntersectionObserver((entries, obs) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
  }), { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

function initFilters() {
  const wrap = $("#project-filters");
  if (!wrap.children.length) return;
  wrap.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    $$("[data-filter]", wrap).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    $$(".project-card").forEach((card) => {
      const show = b.dataset.filter === "All" || card.dataset.category === b.dataset.filter;
      card.classList.toggle("is-hidden", !show);
      if (show) card.classList.add("in");
    });
  });
}

function initRoles() {
  const el = $("#role-text"), roles = CONFIG.roles;
  if (!el || !roles.length) return;
  el.textContent = roles[0];
  if (reduceMotion || roles.length < 2) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.textContent = roles[i];
    el.classList.remove("role-fade"); void el.offsetWidth; el.classList.add("role-fade");
  }, 2600);
}

function initBackToTop() {
  $("#back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}

/* =====================================================================
   5. INIT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderStatic();
  renderProjects();
  renderContact();
  refreshIcons();
  initTheme();
  initMenu();
  initActiveNav();
  initReveal();
  initFilters();
  initRoles();
  initBackToTop();
});
