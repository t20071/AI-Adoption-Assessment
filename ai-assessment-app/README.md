# AI Adoption Assessment

A research-backed web application that measures how effectively employees use AI at work. It provides a score out of 100 across 5 dimensions, a personalised message from an AI leader, and evidence-based recommendations for improvement.

## Features

- **10 research-backed questions** (5 self-report + 5 scenario-based) across 5 dimensions
- **Instant scoring** with a 0-100 scale and 5 proficiency levels
- **Dimension breakdown** showing strengths and areas for growth
- **Personalised recommendations** — AI-generated (when API key is configured) or evidence-based fallback
- **Leader message card** with configurable name, title, and photo
- **Privacy-first** — no data is stored, shared, or tracked
- **Responsive** — works on desktop, tablet, and mobile
- **Accessible** — keyboard navigable, sufficient colour contrast, reduced-motion support

## Tech Stack

**Next.js** (App Router) — chosen because it provides both client-side interactivity and a server-side API route for the LLM call, keeping the API key secure. No separate backend server needed.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm installed

### Local Setup

```bash
# 1. Navigate to the app directory
cd ai-assessment-app

# 2. Install dependencies
npm install

# 3. (Optional) Set up the API key for AI-generated recommendations
#    Copy the example env file and add your Groq API key
cp .env.example .env.local
#    Edit .env.local and add your key: GROQ_API_KEY=gsk_... (from https://console.groq.com/)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: The app works fully without an API key. It uses pre-written, research-grounded recommendations as a fallback. The API key enables more personalised, AI-generated suggestions.

## Configuration

### Leader (Name, Title, Photo)

Edit `app/config/leader.js`:

```javascript
const leaderConfig = {
  name: "Your AI Leader",        // Display name
  title: "Head of AI Strategy",  // Role/title
  photo: "/images/leader-avatar.jpg",  // Path relative to /public
};
```

To use a custom photo, place the image in `public/images/` and update the path.

### Questions

Edit `app/config/questions.js` to modify questions, options, or scoring. Each question needs:
- `id`: Unique identifier
- `dimension`: Which dimension it measures (understanding, application, quality, workflow, ethics)
- `type`: "self-report" or "scenario"
- `text`: The question text
- `options`: Array of `{ text, points }` objects (points: 0-3)

### Scoring Weights

Also in `app/config/questions.js`, the `dimensions` object controls weights:

```javascript
export const dimensions = {
  understanding: { label: "AI Understanding & Literacy", weight: 15, maxRaw: 6 },
  application:   { label: "Practical Application & Tool Use", weight: 25, maxRaw: 6 },
  quality:       { label: "Quality Control & Critical Evaluation", weight: 25, maxRaw: 6 },
  workflow:      { label: "Workflow Integration & Strategy", weight: 20, maxRaw: 6 },
  ethics:        { label: "Responsible & Ethical Use", weight: 15, maxRaw: 6 },
};
```

### Score Bands

In the same file, `scoreBands` defines the level thresholds and descriptions.

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the root directory to `ai-assessment-app`
4. Add `GROQ_API_KEY` (from https://console.groq.com/) or `OPENAI_API_KEY` as an environment variable in the Vercel dashboard (optional)
5. Deploy

### Netlify

1. Push your code to a GitHub repository
2. Go to [netlify.com](https://netlify.com) and import the repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add `GROQ_API_KEY` or `OPENAI_API_KEY` as an environment variable (optional)
6. You may need the `@netlify/plugin-nextjs` plugin for full Next.js support

## Project Structure

```
ai-assessment-app/
├── app/
│   ├── api/
│   │   └── recommendations/
│   │       └── route.js          # Server-side LLM API route
│   ├── config/
│   │   ├── leader.js             # Leader name, title, photo
│   │   └── questions.js          # Questions, dimensions, weights, score bands
│   ├── lib/
│   │   ├── recommendations.js    # Fallback rule-based recommendations
│   │   └── scoring.js            # Score calculation engine
│   ├── globals.css               # Design system (IDinsight branding)
│   ├── layout.js                 # Root layout with metadata
│   └── page.js                   # Main app component (3 screens)
├── public/
│   └── images/
│       ├── leader-avatar.jpg     # Default leader placeholder
│       ├── banner.jpg            # Banner image from IDinsight
│       └── favicon.png           # Favicon
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore (includes .env*)
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Research Foundation

The scoring model is built on 20+ sources from 2023–2026, including:

- **Harvard/BCG "Jagged Frontier" Study** (Dell'Acqua et al., 2023) — N=758
- **Microsoft Work Trend Index** (2025, 2026) — Frontier Professionals concept
- **Anthropic Economic Index** (2026) — 2M real-world AI conversations
- **BCG AI at Work Survey** (2026) — N=13,000+ globally
- **Stanford HAI AI Index** (2026) — 88% organisational adoption
- **Gallup Workplace AI Tracker** (2025-2026) — Manager support as #1 factor
- **OECD/EC AILit Framework** (2026) — 22 competencies across 4 domains
- **UNESCO AI Competency Frameworks** (2024) — Global standards
- **A-Factor Psychometric Framework** (Li et al., 2025) — Validated AI literacy measure

Full research documentation is available in the `research_output/` directory.

## Privacy

- **No data is stored** — answers exist only in the browser session
- **No cookies or analytics** — no tracking of any kind
- **No PII sent to the API** — only dimension scores are sent for AI recommendations
- **API key stays server-side** — never exposed to the browser

## License

Internal use. Consult your organisation's policies before deploying externally.
