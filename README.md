# AI Adoption Assessment — Project Summary

## What Was Built

### Phase 1: Research (6 files in `research_output/`)
Deep autonomous research across 20+ sources (peer-reviewed papers, industry surveys, government frameworks, and AI lab research) to design a scientifically defensible AI adoption scoring model.

### Phase 2: Web App (in `ai-assessment-app/`)
A production-ready Next.js app that asks 10 research-backed questions, calculates a score out of 100 across 5 dimensions, and provides personalised recommendations.

---

## Key Research Findings

| # | Finding | Source |
|---|---------|--------|
| 1 | AI delivers 14–40% task-level gains, but only "inside the frontier" | Harvard/BCG, 2023 (N=758) |
| 2 | Top 16% of users ("Frontier Professionals") redesign workflows, not just use tools | Microsoft WTI 2026 |
| 3 | 92% feel confident in AI skills, but competence gaps persist | Pluralsight 2025 |
| 4 | Organisational factors matter 2× more than individual behaviour | Microsoft WTI 2026 |
| 5 | Quality control of AI output is the #1 valued human skill (50%) | Microsoft WTI 2026 |
| 6 | No public dataset supports a global percentile benchmark | Multiple sources |
| 7 | 10 items is optimal for this context (reliability vs. completion trade-off) | Psychometric literature |

---

## Scoring Model

**5 dimensions**, **10 questions** (50% scenario-based), **score 0–100**:

| Dimension | Weight | Why |
|-----------|--------|-----|
| AI Understanding & Literacy | 15% | Foundation — knowing AI's boundary |
| Practical Application & Tool Use | 25% | Core skill — actually using AI effectively |
| Quality Control & Critical Evaluation | 25% | Key differentiator between average and top users |
| Workflow Integration & Strategy | 20% | Frontier behaviour — redesigning work |
| Responsible & Ethical Use | 15% | Legal/ethical requirement (EU AI Act) |

**Levels**: Starting Out → Building Foundations → Developing Proficiency → Advanced Practitioner → Leading

---

## Files & Folders

### Research Output
- [00_executive_summary.md](file:///d:/iDi/AI%20adoption/research_output/00_executive_summary.md) — Top 10 findings + recommendations
- [01_reading_list.md](file:///d:/iDi/AI%20adoption/research_output/01_reading_list.md) — Ranked table of 20 sources
- [02_findings.md](file:///d:/iDi/AI%20adoption/research_output/02_findings.md) — Answers to all 7 research questions
- [03_scoring_model.md](file:///d:/iDi/AI%20adoption/research_output/03_scoring_model.md) — Full question bank + scoring rules
- [04_risks_and_validation.md](file:///d:/iDi/AI%20adoption/research_output/04_risks_and_validation.md) — Measurement risks + validation plan
- [05_source_log.md](file:///d:/iDi/AI%20adoption/research_output/05_source_log.md) — All sources reviewed

### Web App
- [app/config/leader.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/config/leader.js) — **Edit this** to set leader name, title, photo
- [app/config/questions.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/config/questions.js) — Questions, weights, score bands
- [app/page.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/page.js) — Main app (3 screens)
- [app/api/recommendations/route.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/api/recommendations/route.js) — Server-side LLM route
- [app/lib/scoring.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/lib/scoring.js) — Score calculation
- [app/lib/recommendations.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/lib/recommendations.js) — Fallback recommendations
- [README.md](file:///d:/iDi/AI%20adoption/ai-assessment-app/README.md) — Setup, config, deployment

### Other
- [requirements.txt](file:///d:/iDi/AI%20adoption/requirements.txt) — Python deps (optional, for analysis)
- `venv/` — Python virtual environment

---

## How to Run

```bash
cd ai-assessment-app
npm install
npm run dev
# Open http://localhost:3000
```

For AI-generated recommendations (optional):
```bash
cp .env.example .env.local
# Edit .env.local and add your Groq API key: GROQ_API_KEY=gsk_...
# (Free API credits available at https://console.groq.com/)
```

---

## Design Notes
- Design follows IDinsight branding: navy `#1C2F62`, gold `#D49E00`, light blue `#A8CCEB`, Inter font
- Used the banner image and favicon from the design folder
- **Headshot images were NOT used** — the design folder contains photos of real people. Per requirements, a neutral placeholder avatar was generated instead
- The IDinsight SVG logo requires the `sprite.symbol.svg` file which uses `xlink:href` and won't render standalone; the header uses text instead

---

## Three Open Questions for You

> [!IMPORTANT]
> 1. **Who is the AI leader?** Edit [leader.js](file:///d:/iDi/AI%20adoption/ai-assessment-app/app/config/leader.js) with the real name, title, and photo of whoever should appear on the results card. Place their photo in `public/images/`.
>
> 2. **Do you want to deploy now?** The app is ready for Vercel/Netlify. I can walk you through it, but per your instructions I haven't deployed or spent money. Shall I proceed?
>
> 3. **Should the score have consequences?** The research strongly recommends framing this as a development tool, not a performance metric. If you plan to attach any consequences (recognition, etc.), the questions may need adjustment to reduce gaming risk. What's your intent?
