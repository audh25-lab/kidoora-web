// src/utils/svgAssetGenerator.js
// Generates simple SVG icons/mascot data URLs at runtime.
// It stores them in window.__KIDOORA_ASSETS__ for other components to use.

export async function ensureGeneratedAssets() {
  if (typeof window === "undefined") return;
  if (window.__KIDOORA_ASSETS__ && Object.keys(window.__KIDOORA_ASSETS__).length) return;

  const assets = {};

  // generate icon generator function
  const svgToDataURL = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  // lightweight dynamic icon generator: colored circle + emoji/text
  const makeIcon = (emoji, bg, fg, label) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="${shade(bg, -12)}"/>
        </linearGradient>
      </defs>
      <rect rx="28" width="160" height="160" fill="url(#g)"/>
      <text x="50%" y="50%" font-size="48" dominant-baseline="middle" text-anchor="middle">${emoji}</text>
      <text x="50%" y="88%" font-size="12" dominant-baseline="middle" text-anchor="middle" fill="${fg}" font-family="sans-serif">${label}</text>
    </svg>`;
    return svgToDataURL(svg);
  };

  // create a small set of icons
  assets.icon_alphabet = makeIcon("🔤", "#FFD97D", "#3B2F2F", "Alphabet");
  assets.icon_numbers = makeIcon("🔢", "#C6F6D5", "#1B3A2D", "Numbers");
  assets.icon_shapes = makeIcon("🔷", "#BFE9FF", "#05314B", "Shapes");
  assets.lesson = makeIcon("⭐", "#FFEDD5", "#6B3A00", "Lesson");

  // simple mascot generator (island kid)
  const mascotSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420">
    <rect width="100%" height="100%" fill="#e6fbff"/>
    <g transform="translate(60,40)">
      <circle cx="150" cy="80" r="60" fill="#FFD7A8"/>
      <rect x="120" y="120" rx="22" width="60" height="90" fill="#48C0A6"/>
      <circle cx="130" cy="70" r="6" fill="#2B2B2B"/><circle cx="170" cy="70" r="6" fill="#2B2B2B"/>
      <path d="M125 95 q25 18 50 0" stroke="#8B3A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="200" r="18" fill="#FFD97D"/>
      <rect x="30" y="210" width="240" height="30" rx="12" fill="#FFE7C7" opacity="0.9"/>
    </g>
  </svg>`;
  assets.mascot = svgToDataURL(mascotSvg);

  // expose
  window.__KIDOORA_ASSETS__ = assets;
}

function shade(hex, percent) {
  // simple hex shade helper: percent negative to darken, positive to lighten
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("");
  const num = parseInt(c, 16);
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00FF) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000FF) + Math.round((percent / 100) * 255);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}