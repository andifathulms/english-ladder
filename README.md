# English Ladder

A calm, levelled English course for Indonesian speakers. Nine rungs from Easy 1 (CEFR A1) to Hard 3 (C1); v1 ships the full app shell and the complete **Easy 1** rung: ten lessons, a rung test, the place scene and noun builder visuals, quick review, My words, settings and offline support. Progress stays in the learner's browser.

Static Next.js 14 export, deployed to GitHub Pages.

- `PRD.md`: what to build
- `DESIGN.md`: how it looks and feels
- `CLAUDE.md`: how it is built

## Commands

```bash
npm install
npm run dev            # local dev, shows draft lessons with a Draft badge
npm run build          # content:check, then static export to ./out
npm run preview        # serve ./out on http://localhost:4173
npm run content:check  # schema + inventory + lexicon + structure lint
npm run test           # vitest (unit + component)
npm run test:e2e       # playwright + axe, against the built site
npm run lint
```

`NEXT_PUBLIC_BASE_PATH` sets the GitHub Pages base path (e.g. `/english-ladder`).

## Draft lessons

All Easy 1 lessons are `status: draft` until the owner reviews them. Production builds hide drafts unless `NEXT_PUBLIC_SHOW_DRAFTS=true`; the GitHub Pages workflow sets it so the course can be tested before review, and every draft carries a visible Draft badge. Remove that variable from `.github/workflows/deploy.yml` once lessons are marked `reviewed`.
