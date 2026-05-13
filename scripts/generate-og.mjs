// Per-agent OG card generator — SVG → PNG (1200×630)
// Output: public/og/{slug}.png  (és .svg fallback)
//
// Run: node scripts/generate-og.mjs
// Requires macOS `sips` for SVG→PNG.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const agents = [
  { slug: "scout",        name: "Scout",        role: "Felderítő",            tagline: "Magyar vállalkozókat talál, élesben.",     em: "vállalkozókat",     accent: "#a8d8ea", accentStrong: "#c0e4f0" },
  { slug: "manager",      name: "Manager",      role: "Értékesítési vezető",  tagline: "Pipeline-t futtat, fázisokat léptet.",     em: "Pipeline-t",        accent: "#e6c89c", accentStrong: "#efd6b3" },
  { slug: "operations",   name: "Operations",   role: "Operatív koordinátor", tagline: "Heti riportot ad, négyfelé szinkronizál.", em: "riportot",          accent: "#b8b8c8", accentStrong: "#cccdd8" },
  { slug: "optimizer",    name: "Optimizer",    role: "Kísérletvezető",       tagline: "A/B-tesztel mindent, ami konvertál.",      em: "A/B-tesztel",       accent: "#d4a5b5", accentStrong: "#e0b8c5" },
  { slug: "finance",      name: "Finance",      role: "Pénzügyi vezető",      tagline: "Stripe-on számláz, bevételt riportol.",    em: "Stripe-on",         accent: "#a8d8b8", accentStrong: "#bce4ca" },
  { slug: "orchestrator", name: "Orchestrator", role: "Igazgató",             tagline: "Magyar parancsból vezényli az ötöt.",      em: "vezényli",          accent: "#b9a7e0", accentStrong: "#cdb9eb" },
];

const outDir = path.join(process.cwd(), "public", "og");
fs.mkdirSync(outDir, { recursive: true });

function splitTagline(tagline, em) {
  // Tagline-t feldarabolja em előtt és után, hogy SVG-ben tspan-nel ki tudjuk emelni
  const idx = tagline.indexOf(em);
  if (idx === -1) return { before: tagline, em: "", after: "" };
  return {
    before: tagline.slice(0, idx),
    em,
    after: tagline.slice(idx + em.length),
  };
}

function makeSvg({ slug, name, role, tagline, em, accent, accentStrong }) {
  const parts = splitTagline(tagline, em);
  const accentRGB = accent.match(/[A-F0-9]{2}/gi).map((x) => parseInt(x, 16)).join(", ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0" cy="0" r="0.85">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="1" cy="1" r="0.7">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0c"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#vignette)"/>
  <text x="72" y="92" font-family="JetBrains Mono, ui-monospace, monospace" font-size="20" letter-spacing="3.6" fill="#a1a1aa">EXPERT FLOW ÜGYNÖKÖK · ${role.toUpperCase()}</text>
  <text x="72" y="170" font-family="Georgia, serif" font-style="italic" font-size="120" fill="${accentStrong}" letter-spacing="-2">${name}</text>
  <text x="72" y="310" font-family="Georgia, serif" font-size="62" fill="#fafafa">${parts.before}<tspan font-style="italic" fill="${accentStrong}">${parts.em}</tspan>${parts.after}</text>
  <line x1="72" y1="500" x2="170" y2="500" stroke="${accent}" stroke-width="3"/>
  <text x="72" y="560" font-family="JetBrains Mono, ui-monospace, monospace" font-size="18" letter-spacing="2.4" fill="#a1a1aa">/${slug.toUpperCase()}</text>
  <text x="1128" y="595" font-family="JetBrains Mono, ui-monospace, monospace" font-size="16" letter-spacing="3" fill="${accent}" text-anchor="end">EXPERT-FLOW-AGENTS.VERCEL.APP</text>
</svg>`;
}

let pngOk = 0;
let svgOk = 0;
for (const agent of agents) {
  const svgPath = path.join(outDir, `${agent.slug}.svg`);
  const pngPath = path.join(outDir, `${agent.slug}.png`);
  fs.writeFileSync(svgPath, makeSvg(agent));
  svgOk++;
  try {
    execFileSync("sips", ["-s", "format", "png", svgPath, "--out", pngPath], { stdio: "ignore" });
    pngOk++;
    console.log(`✓ og/${agent.slug}.png  (${agent.role}, accent ${agent.accent})`);
  } catch (err) {
    console.error(`✗ ${agent.slug}: sips failed`, err.message);
  }
}
console.log(`\nGenerated ${svgOk} SVG + ${pngOk} PNG → public/og/`);
