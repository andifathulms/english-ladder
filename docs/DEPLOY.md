# Deploying Ladder courses

Each app builds to `apps/<app>/out` with `output: 'export'` (fully static). Every internal
link and asset already works with and without a base path, so a course can live at a domain
root or under a sub-path.

Today only **English Ladder** ships. The workflow (`.github/workflows/deploy.yml`) builds
`apps/english` with `NEXT_PUBLIC_BASE_PATH=/<repo-name>` and uploads `apps/english/out` to
GitHub Pages — identical to before the monorepo split. A commented matrix stub shows where the
other apps slot in.

When a second course is ready, pick one of these.

## Option A — one Pages site, each app under its own sub-path (recommended)

Build every app with its own base path and lay the outputs side by side into one artifact:

```
public-root/
  english/   -> apps/english/out   built with NEXT_PUBLIC_BASE_PATH=/<repo>/english
  arabic/    -> apps/arabic/out    built with NEXT_PUBLIC_BASE_PATH=/<repo>/arabic
  ...
```

Build each app in a matrix, then combine into the Pages artifact. One repository, one Pages
site, one deploy. Courses can link to each other with relative paths. This is the simplest to
operate and keeps everything in this repo — **recommended**.

```yaml
strategy:
  matrix:
    include:
      - { app: english,  path: /ENGREPO/english }
      - { app: arabic,   path: /ENGREPO/arabic }
# build step: NEXT_PUBLIC_BASE_PATH=${{ matrix.path }} npm run build -w ${{ matrix.app }}-ladder
# then rsync each apps/<app>/out into public-root/<app> and upload public-root once.
```

## Option B — each app to its own repo's Pages (deploy token)

Give each course its own repository and Pages site (e.g. `arabic-ladder` →
`https://<org>.github.io/arabic-ladder`). This monorepo builds each app and pushes
`apps/<app>/out` to the target repo's `gh-pages` branch using a deploy token
(`peaceiris/actions-gh-pages` with a `personal_token`/deploy key), or each course repo pulls
the engine as a git submodule / workspace and deploys itself.

Use this only if courses need separate domains, separate release cadences, or separate access
control. It costs an extra repo and a token per course and splits operational surface.

## Recommendation

Start with **Option A**. It needs no cross-repo tokens, keeps one source of truth, and a new
course is a few matrix lines plus a base path. Move a course to Option B only if it genuinely
needs its own domain or release schedule.
