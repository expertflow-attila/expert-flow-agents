# expert-flow-agents — sub-agent ecosystem

Öt specializált Claude Code sub-agent a **expert-flow-agents** Astro site iteratív fejlesztéséhez. Mindegyik project-scoped (`.claude/agents/`), így a repo-val együtt utaznak.

## A csapat

| Agent | Szerep | Kit szólít meg | Tools |
|---|---|---|---|
| **`lead-architect`** | Vezető architekt — feladat-lebontás, priorizálás, delegálás | A user (te) | Read, Grep, Glob, Bash, Agent |
| **`ux-design-critic`** | Webdesign / UX / UI audit + iteráció | `lead-architect` | Read, Edit, Write, Grep, Glob, Bash |
| **`copy-editor-hu`** | Magyar szövegezés, nyelvtan, voice-konzisztencia | `lead-architect` | Read, Edit, Grep, Glob |
| **`agent-content-reviewer`** | A 6 ügynök content struktúrális auditja | `lead-architect` | Read, Edit, Grep, Glob |
| **`mobile-premium-specialist`** | Mobil-first prémium UX/UI builder | `lead-architect` | Read, Edit, Write, Grep, Glob, Bash |

## Felelősség-térkép

```
                    ┌──────────────────┐
                    │  lead-architect  │  ← te ezt szólítod meg
                    │   (orchestrator) │
                    └────────┬─────────┘
                             │  delegál
        ┌────────────┬───────┴───────┬──────────────────┐
        ▼            ▼               ▼                  ▼
┌───────────────┐ ┌──────────┐ ┌─────────────┐ ┌────────────────────┐
│ ux-design-    │ │ copy-    │ │ agent-      │ │ mobile-premium-    │
│ critic        │ │ editor-  │ │ content-    │ │ specialist         │
│               │ │ hu       │ │ reviewer    │ │                    │
│ design / UX/  │ │ magyar   │ │ 6 ügynök    │ │ mobil 320–768px    │
│ UI / spacing  │ │ voice    │ │ konzisztencia│ │ premium feeling    │
└───────────────┘ └──────────┘ └─────────────┘ └────────────────────┘
```

## Hogyan használd

### Tipikus flow — összetett feladat

```
"Lead-architect, az oldal mobilon nem érződik prémiumnak,
és a Finance tagline szerintem fluff. Audit + javaslat."
```

A `lead-architect` lebontja:
1. Dispatch `mobile-premium-specialist` → mobil audit (320-768px)
2. Dispatch `copy-editor-hu` → Finance tagline + lede review
3. Dispatch `ux-design-critic` → összesített design impact
4. Synthesize → P0/P1/P2 brief

### Direkt hívás — egy specifikus feladat

```
"copy-editor-hu, írd át a Scout lede-et — tele van AI-fluff-fal."
"mobile-premium-specialist, a tab-strip 360px-en horizontal scroll-snap legyen."
"ux-design-critic, a hero spacing nem ül 1024px-en."
```

### Multi-agent (parallel) hívás

```
"Lead-architect, indíts egy teljes audit-ot mind a négy specialistával.
Kérek egy összesített P0/P1/P2 listát."
```

## Skill-sávok (mit NE csinálj velük)

- ❌ `copy-editor-hu` ne nyúljon CSS-hez — UX-be jelez fel
- ❌ `ux-design-critic` ne írjon copy-t — copy-editor-be jelez fel
- ❌ `mobile-premium-specialist` ne írjon át agent-content-et — agent-reviewer-be jelez fel
- ❌ `lead-architect` **soha** nem ír kódot — csak szintetizál és delegál
- ✅ Ha specialista cross-domain problémát lát, **jelez** a megfelelő társnak

## Premium minőségi axiómák (mind az 5 betartja)

1. **Mobil-first** — minden döntésnél kérdezzük "ez 360px-en is ül?"
2. **Magyar voice** — Expert Flow direct, no-fluff, leszállít (nem hype)
3. **Performance** — build < 2s, < 50KB CSS gzipped, 60fps animációk
4. **Konkretság** — minden javaslat tartalmazza file:line + recommended fix
5. **iOS Safari first** — magyar creator audience tipikusan iPhone-os

## Iterációs ciklus (típikus 1-iteráció)

```
1. user kérés → lead-architect
2. lead-architect → 1-3 specialista parallel dispatch
3. specialisták → findingok + javaslatok
4. lead-architect → P0/P1/P2 brief + decision log
5. user → "go" / "halaszd P2-re" / "tisztázd X-et"
6. specialisták → patch-ek
7. git commit + push → Vercel auto-deploy → live URL 30s alatt
```

## Hozzáadás / módosítás

- Új sub-agent: új `.md` file ide a `.claude/agents/`-be a frontmatter-séma szerint
- Módosítás: edit a meglévő `.md`-t, commit
- Lokális szintű override (csak a te gépedre): `.claude/agents/<name>.local.md` (gitignored)

---

**Verzió**: 1.0 — Initial 5-agent ecosystem (2026-05-07)
