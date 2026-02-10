// === CONFIG (Guatemala -06:00) ===
const START_DATE = "2022-12-29T00:00:00-06:00";
const NEXT_SPECIAL_DATE = "2026-02-14T00:00:00-06:00";

// Carta (tu versión)
const LETTER = `
Mi morenita de oro 💛,

Quería darte algo diferente: una carta que vive en la nube,
una prueba pequeña pero real de lo mucho que te pienso 24x7x365 (siempre a cada milisegundo)
sabes que eres mi pensamiento constante.

Desde el 29 de diciembre de 2022, mi vida se siente más brillante, más ligera, plena y realizado
siendo el hombre mas feliz a tu lado.
Me encanta cómo me inspiras, cómo me cuidas, cómo me haces querer ser mejor, como eres mi energia en cada día
y me haces ser la mejor persona del universo, para ti y para nostros, y te correspondere siempre y a más amor.

Gracias por existir y ser mi mundo.
Mi promesa es simple: elegirte, respetarte, amarte, y darte todo lo que mereces en el mundo,
en lo bonito… y también en lo difícil....

Te amo, mi marquesita.

— Alejandro Montalvo (Moshtito) 💛
`.trim();

// === Helpers ===
const pad = (n) => String(n).padStart(2, "0");
const fmt = (d,h,m,s) => `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;

function diffParts(from, to){
  const ms = Math.max(0, to - from);
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return { d, h, m, ss };
}

function typeWriter(el, text, speed=14){
  el.textContent = "";
  let i = 0;
  const tick = () => {
    el.textContent += text[i] ?? "";
    i++;
    if (i < text.length) setTimeout(tick, speed);
  };
  tick();
}

// === Init ===
const timeTogetherEl = document.getElementById("timeTogether");
const countdownEl = document.getElementById("countdown");
const hintEl = document.getElementById("countdownHint");
const todayEl = document.getElementById("today");

const start = new Date(START_DATE);
const next = new Date(NEXT_SPECIAL_DATE);

todayEl.textContent = new Date().toLocaleDateString("es-GT", {
  year:"numeric", month:"long", day:"numeric"
});

typeWriter(document.getElementById("letterText"), LETTER);

function render(){
  const now = new Date();

  // tiempo juntos
  const t = diffParts(start, now);
  timeTogetherEl.textContent = fmt(t.d, t.h, t.m, t.ss);

  // countdown
  const c = diffParts(now, next);
  countdownEl.textContent = fmt(c.d, c.h, c.m, c.ss);

  hintEl.textContent = (now > next) ? "Ya llegó el día 💘" : "Falta poquito ✨";
}
render();
setInterval(render, 1000);

// Botones fotos y modo noche
document.getElementById("revealPhotos").addEventListener("click", () => {
  document.getElementById("photos").classList.toggle("hidden");
});

document.getElementById("toggleNight").addEventListener("click", () => {
  document.body.classList.toggle("night");
});

// ===== Valentine Interaction =====
const valTitle = document.getElementById("valTitle");
const valSub = document.getElementById("valSub");
const valActions = document.getElementById("valActions");

const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");

const coupon = document.getElementById("coupon");
const couponCodeEl = document.getElementById("couponCode");
const couponFineEl = document.getElementById("couponFine");

function makeCouponCode(){
  const base = Math.random().toString(36).slice(2, 6).toUpperCase();
  const ts = Date.now().toString().slice(-4);
  return `AMOR-${base}-${ts}`;
}

function showCoupon(){
  valActions.classList.add("hidden");
  coupon.classList.remove("hidden");

  couponCodeEl.textContent = makeCouponCode();

  const now = new Date();
  const pretty = now.toLocaleDateString("es-GT", { year:"numeric", month:"long", day:"numeric" });
  couponFineEl.textContent = `Emitido el ${pretty}. Válido por 1 cita (canje con Alejandro).`;
}

btnYes.addEventListener("click", () => {
  valTitle.textContent = "Sabía que ibas a decir que sí 💘";
  valSub.textContent = "Cupón desbloqueado… ahora mándame captura por WhatsApp 📲";
  showCoupon();
});

btnNo.addEventListener("click", () => {
  // Segunda oportunidad
  valTitle.textContent = "¿Segura? 🥺💛";
  valSub.textContent = "Última oportunidad… elige con el corazón 😌";

  // Cambia botones a Sí / Sí
  btnYes.textContent = "Sí 💛";
  btnNo.textContent = "Sí 💖";

  // El "No" ahora también desbloquea cupón (una sola vez)
  btnNo.addEventListener("click", () => {
    valTitle.textContent = "Esa es mi Princesa 😌💘";
    valSub.textContent = "Cupón desbloqueado. Te toca mandarme captura por WhatsApp 📲";
    showCoupon();
  }, { once: true });
});
