// ----- Data (mock) -----
const tailors = [
  {
    name: "Rani Sharma",
    location: "Lajpat Nagar, Delhi",
    services: ["Repairs", "Custom Blouse", "Alterations"],
    price: "₹200 – ₹1000",
    avatar: "RS"
  },
  {
    name: "Ayesha Khan",
    location: "Karol Bagh, Delhi",
    services: ["Kurta Stitching", "Pants Alteration", "Repairs"],
    price: "₹250 – ₹1200",
    avatar: "AK"
  },
  {
    name: "Vikram Tailors",
    location: "Noida Sector 18",
    services: ["Saree Fall/Pico", "Jacket Alteration", "Repairs"],
    price: "₹150 – ₹800",
    avatar: "VT"
  },
  {
    name: "Meera Designs",
    location: "Gurugram, DLF Phase 3",
    services: ["Custom Lehenga", "Blouse Stitching"],
    price: "₹500 – ₹3000",
    avatar: "MD"
  },
  {
    name: "Om Tailor House",
    location: "South Ex, Delhi",
    services: ["Shirt Alteration", "Trouser Hem", "Repairs"],
    price: "₹150 – ₹700",
    avatar: "OT"
  },
  {
    name: "Stitch & Save",
    location: "Dwarka, Delhi",
    services: ["Repairs", "Upcycling", "Kidswear"],
    price: "₹180 – ₹900",
    avatar: "SS"
  }
];

const shops = [
  {
    name: "Mehra Fabrics",
    location: "Karol Bagh, Delhi",
    available: ["Cotton", "Silk", "Linen"],
    deal: "Get fabric at 30% off"
  },
  {
    name: "Sudarshan Textiles",
    location: "Chandni Chowk, Delhi",
    available: ["Chiffon", "Georgette", "Organza"],
    deal: "Deadstock: Flat 25% off"
  },
  {
    name: "Green Looms",
    location: "Noida Sector 27",
    available: ["Organic Cotton", "Khadi"],
    deal: "Eco picks at 15% off"
  },
  {
    name: "DLF Fabrics",
    location: "Gurugram, MG Road",
    available: ["Denim", "Twill"],
    deal: "Buy 2m get 1m free"
  }
];

const tailorOrders = [
  { id: "#A1023", item: "Blouse Stitching", status: "Pending" },
  { id: "#A1024", item: "Kurta Alteration", status: "Completed" },
  { id: "#A1025", item: "Zipper Repair", status: "Pending" }
];

const pastOrders = [
  { id: "#C2001", item: "Trouser Hem", date: "2025-08-12", amount: "₹180" },
  { id: "#C2002", item: "Kurta Stitch", date: "2025-08-20", amount: "₹850" },
  { id: "#C2003", item: "Blouse Alteration", date: "2025-09-01", amount: "₹350" },
];

// ----- Helpers -----
const el = (q, root = document) => root.querySelector(q);
const elAll = (q, root = document) => [...root.querySelectorAll(q)];

function createTailorCard(t) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center;">
      <div class="avatar" aria-hidden="true">${t.avatar}</div>
      <div>
        <h4>${t.name}</h4>
        <div class="muted">${t.location}</div>
      </div>
    </div>
    <div class="badges"></div>
    <div class="price">${t.price}</div>
    <div class="card-actions">
      <button class="btn btn-primary book-btn">Book Now</button>
      <button class="btn btn-outline">View Profile</button>
    </div>
  `;
  const badgeBox = el(".badges", div);
  t.services.forEach(s => {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = s;
    badgeBox.appendChild(b);
  });
  el(".book-btn", div).addEventListener("click", () => openModal("Book Tailor", `${t.name} • ${t.location}<br><small>${t.services.join(", ")}</small>`));
  return div;
}

function createShopCard(s) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h4>${s.name}</h4>
    <div class="muted">${s.location}</div>
    <div class="badges"></div>
    <p class="muted" style="margin-top:8px;">Deadstock Deals: <strong>${s.deal}</strong></p>
    <div class="card-actions">
      <button class="btn btn-primary visit-btn">Visit Shop</button>
      <button class="btn btn-outline">Call</button>
    </div>
  `;
  const badgeBox = el(".badges", div);
  s.available.forEach(a => {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = a;
    badgeBox.appendChild(b);
  });
  el(".visit-btn", div).addEventListener("click", () => openModal("Visit Shop", `${s.name} • ${s.location}<br><small>Available: ${s.available.join(", ")}</small>`));
  return div;
}

function numberEase(elm, target, duration = 1000) {
  let start = 0;
  const startTime = performance.now();
  const step = (t) => {
    const p = Math.min((t - startTime) / duration, 1);
    const val = Math.floor(p * target);
    elm.textContent = val.toLocaleString("en-IN");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ----- Rendering -----
function renderTailors(filter = "") {
  const box = el("#tailorList");
  box.innerHTML = "";
  const q = filter.trim().toLowerCase();
  tailors
    .filter(t => !q || t.location.toLowerCase().includes(q) || t.services.join(" ").toLowerCase().includes(q))
    .forEach(t => box.appendChild(createTailorCard(t)));

  if (!box.children.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<p class="muted">No tailors found. Try another location or skill.</p>`;
    box.appendChild(empty);
  }
}

function renderShops() {
  const box = el("#shopList");
  box.innerHTML = "";
  shops.forEach(s => box.appendChild(createShopCard(s)));
}

function renderTailorOrders() {
  const ul = el("#tailorOrders");
  ul.innerHTML = "";
  tailorOrders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.id} • ${o.item} — ${o.status}`;
    ul.appendChild(li);
  });
}

function renderPastOrders() {
  const ul = el("#pastOrders");
  ul.innerHTML = "";
  pastOrders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.id} • ${o.item} • ${o.date} • ${o.amount}`;
    ul.appendChild(li);
  });
}

// ----- Simple Revenue Chart -----
function drawRevenueChart() {
  const c = el("#revenueChart");
  if (!c) return;
  const ctx = c.getContext("2d");
  // Clear
  ctx.clearRect(0,0,c.width,c.height);

  const data = [20, 26, 23, 30, 34, 40, 46, 52, 50, 58, 63, 72]; // in thousands
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // margins
  const m = {t:20,r:20,b:40,l:40};
  const w = c.width - m.l - m.r;
  const h = c.height - m.t - m.b;
  const max = Math.max(...data) * 1.1;

  // axes
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.moveTo(m.l, m.t);
  ctx.lineTo(m.l, m.t + h);
  ctx.lineTo(m.l + w, m.t + h);
  ctx.stroke();

  // bars
  const barW = w / data.length * 0.6;
  const gap = (w / data.length) - barW;

  data.forEach((v, i) => {
    const x = m.l + i * (barW + gap) + gap/2;
    const y = m.t + h - (v / max) * h;
    const barH = (v / max) * h;

    // bar
    ctx.fillStyle = "#5cf0a7";
    ctx.fillRect(x, y, barW, barH);

    // label
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[i], x + barW/2, m.t + h + 16);
  });

  // title
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "14px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Monthly Revenue (₹ thousands)", m.l, 16);
}

// ----- Modal -----
function openModal(title, bodyHTML) {
  const dlg = el("#appModal");
  el("#modalTitle").textContent = title;
  el("#modalBody").innerHTML = bodyHTML;
  dlg.showModal();
}

// ----- Nav / Tabs / Login -----
function setupNav() {
  const hamburger = el("#hamburger");
  const navLinks = el("#navLinks");
  hamburger.addEventListener("click", () => {
    const open = navLinks.style.display === "flex";
    navLinks.style.display = open ? "none" : "flex";
    hamburger.setAttribute("aria-expanded", String(!open));
  });

  // Close menu on link click (mobile)
  elAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 880) navLinks.style.display = "none";
    });
  });
}

function setupTabs() {
  const tabs = elAll(".tab");
  const panels = elAll(".dash-panel");
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");

      const key = t.dataset.tab;
      panels.forEach(p => p.hidden = p.dataset.content !== key);
      if (key === "shop") drawRevenueChart();
    });
  });
}

function setupLogin() {
  const btn = el("#loginBtn");
  const dash = el("#dashboard");
  btn.addEventListener("click", () => {
    dash.hidden = false;
    openModal("Welcome back!", "You are now viewing the dashboard. Use the tabs to switch roles.");
    // Scroll to dashboard
    document.location.hash = "#dashboard";
  });
}

// ----- Impact counters -----
function setupImpactCounters() {
  numberEase(el("#statOrders"), 1248, 1200);
  numberEase(el("#statClothes"), 892, 1200);
  numberEase(el("#statCO2"), 5360, 1200);
}

// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
  renderTailors();
  renderShops();
  renderTailorOrders();
  renderPastOrders();
  setupNav();
  setupTabs();
  setupLogin();
  setupImpactCounters();
  drawRevenueChart();
  el("#year").textContent = new Date().getFullYear();

  el("#tailorSearch").addEventListener("input", (e) => {
    renderTailors(e.target.value);
  });
});
