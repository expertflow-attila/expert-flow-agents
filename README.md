# Expert Flow Agents

A 6 AI ügynök publikus bemutató oldala — az **Expert Flow Agentic Flow** retainer szint része.

| Ügynök | Szerep |
|---|---|
| **Scout** | Felderítő — új ügyfelek keresése |
| **Manager** | Ügyfélmenedzser — pipeline és kapcsolat |
| **Operations** | Operatív működés — riportok, kalendárium, Drive |
| **Optimizer** | Optimalizáló — A/B kísérletek és finomítás |
| **Finance** | Pénzügy — Stripe, számlák, bevétel |
| **Orchestrator** | Igazgató — útválasztó és koordinátor |

A site magyar nyelvű, dokumentáló hangon mutatja meg, mit csinál mindegyik ügynök.

## Stack

- [Astro v5](https://astro.build) (statikus generálás)
- Vanilla CSS, Hermes-féle effektek (grain, blink, dither)
- Premium Dark Library brand: Inter + Instrument Serif + JetBrains Mono
- Vercel deploy

## Local development

```bash
npm install
npm run dev
```

Megnyitás: <http://localhost:4321>

## Routes

- `/` — átirányít az Orchestrator oldalra
- `/scout` · `/manager` · `/operations` · `/optimizer` · `/finance` · `/orchestrator`

## Tartalom

A 6 ügynök szöveges tartalma a [src/data/agents.json](src/data/agents.json) fájlban él. Tagline / lede / 6 feature / terminál script mindegyikhez. A tartalom forrása a 6 ügynök tényleges TypeScript implementációja az `EXPERT AI TEAM/api/agents/`-ben — itt csak a publikus bemutató szöveg.

## Kapcsolódó

- [expertflow.hu](https://expertflow.hu) — fő oldal
- [expert-flow-start-2-0.vercel.app](https://expert-flow-start-2-0.vercel.app) — előkészítő kurzus

---

© 2026 Expert Flow · MIT License
