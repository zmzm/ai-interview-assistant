# AI Interview Assistant

Interviewer-facing web app for running structured senior engineering interviews. It provides role-specific interview tracks, guided question blocks, rubric scoring, evidence capture, red-flag tracking, and a Markdown summary export.

The app runs entirely client-side for interview data: notes, scores, evidence, and summary state are kept in `sessionStorage` for the current browser session.

## Features

- Track selection for Senior Frontend, Senior Backend, and Senior Fullstack interviews.
- Track-specific timelines: 60 minutes for Frontend/Backend and 90 minutes for Fullstack.
- Bilingual question text in the track data (`en` and `ru`).
- Rubric scoring with evidence fields for each criterion.
- Red-flag checklist and verdict calculation on the summary page.
- Markdown export for the final interview summary.
- Light and dark color modes.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Chakra UI 3
- Tailwind CSS 4 utilities
- Lucide React icons
- pnpm

## Project Structure

```text
app/
  page.tsx              Track selection
  interview/page.tsx    Interview timeline, questions, notes, and scoring
  summary/page.tsx      Final verdict and Markdown export
  layout.tsx            Root provider and metadata
  globals.css           App-level global styles
components/
  *.tsx                 UI components for tracks, timeline, questions, scoring, logo, theme
  ui/                   Chakra/color-mode provider helpers
lib/
  interview-data.ts     Typed loader for track JSON files
  tracks/
    fe.json             Frontend interview plan
    be.json             Backend interview plan
    fs.json             Fullstack interview plan
public/                 Static icons/placeholders
styles/                 Additional global style entry
Dockerfile              Standalone production Next.js image
docker-compose.yml      Production app service on the external proxy network
```

## Requirements

- Node.js 20+
- pnpm via Corepack

Enable pnpm if needed:

```bash
corepack enable
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev      # Start the Next.js dev server with webpack
pnpm build    # Build the standalone production app
pnpm start    # Start the production server after a build
pnpm lint     # Run ESLint
```

## Docker

Build and run the production image:

```bash
docker build -t ai-interview-assistant .
docker run --rm -p 4000:4000 ai-interview-assistant
```

Open `http://localhost:4000`.

The included `docker-compose.yml` expects an external Docker network named `proxy` and runs the app service as `nextapp`. The app listens on port `4000` inside the container.

## Interview Data

Interview plans live in `lib/tracks/*.json`. Each track file contains:

- `blocks`: timed interview sections with one standardized `core` question and optional deep-dive questions.
- `rubric.criteria`: scoreable criteria used by the notes/scoring panel and summary.
- `rubric.scoreAnchors`: shared behavioral anchors for `N/A` and scores `0–3`.
- `rubric.redFlags`: observable red flags that require a concrete evidence note.

Interviewers should ask every Core question and mark questions as covered. Optional questions are a bank for role-relevant depth, not a checklist. Unassessed (`N/A`) criteria are excluded from the total score, and the summary requires evidence across at least 60% of the rubric before producing a score-based verdict.

Each track also contains a `choose_one` Practical Work Sample block. The interviewer selects one of five rendered artifacts: code review, production trace, architecture diagnosis, safe migration plan, or code analysis. Marking an option as covered automatically replaces any previously selected option from that block.

`lib/interview-data.ts` maps the route-level track names (`frontend`, `backend`, `fullstack`) to those JSON files.

## Data And Privacy

No backend persistence is configured. Interview notes, scores, red flags, evidence, and summary payloads are stored in browser `sessionStorage` only. Closing the tab or browser session can discard the current interview state.
