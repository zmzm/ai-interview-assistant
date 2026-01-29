# AI Interview Assistant

A structured, interviewer-facing web app for running senior technical interviews. The UI guides you through a prebuilt interview plan, captures notes and rubric scores, and generates a summary you can export as Markdown — all locally in the browser.

## Features

- **Track-based interviews** for frontend, backend, or fullstack roles.
- **Timeline-driven flow** to move through interview blocks and questions.
- **Scoring + evidence capture** aligned to a rubric, including red-flag tracking.
- **End-of-interview summary** with calculated verdicts and Markdown export.
- **Light/Dark mode** support.
- **Local-only data** stored in `sessionStorage` during the session.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Chakra UI**
- **Tailwind CSS utilities** (via `tailwind-merge`, `tailwindcss-animate`)
- **Lucide Icons**

## Project Structure

\`\`\`
app/
  page.tsx        # Track selection landing page
  interview/      # Interview flow UI
  summary/        # Summary + export
components/       # UI building blocks
lib/              # Interview data + helpers
styles/           # Global styles
\`\`\`

## Getting Started

### Install

\`\`\`bash
pnpm install
\`\`\`

### Run locally

\`\`\`bash
pnpm dev
\`\`\`

The app will be available at `http://localhost:3000`.

### Build

\`\`\`bash
pnpm build
\`\`\`

### Lint

\`\`\`bash
pnpm lint
\`\`\`

## Usage

1. **Select a track** on the landing page.
2. **Run the interview** using the timeline, selecting questions in each block.
3. **Capture notes, scores, red flags, and evidence** as you go.
4. **Finish the interview** to review the summary and **export as Markdown**.

## Data & Privacy

All interview data is kept in the browser for the current session (via `sessionStorage`). Nothing is persisted or sent to external services by default.

## Deployment

This project can be deployed to any Node-compatible host. For Vercel:

\`\`\`bash
vercel
\`\`\`

## License

This project is intended for internal use. Add a license if you plan to distribute it.
