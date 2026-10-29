# Deploying Ladder courses

Each app builds to `apps/<app>/out` with `output: 'export'` (fully static). Every internal
link and asset already works with and without a base path, so a course can live at a domain
root or under a sub-path.

Five courses ship from this repo (`.github/workflows/deploy.yml`):

| Course | Built with | Published to | Job |
|---|---|---|---|
| English Ladder | `NEXT_PUBLIC_BASE_PATH=/<this repo>` | this repo's Pages (Actions artifact) | `build` → `deploy` |
| Arabic Ladder | `NEXT_PUBLIC_BASE_PATH=/arabic-ladder` | `gh-pages` branch of `andifathulms/arabic-ladder` | `deploy-arabic` (option B) |
| Mandarin Ladder | `NEXT_PUBLIC_BASE_PATH=/mandarin-ladder` | `gh-pages` branch of `andifathulms/mandarin-ladder` | `deploy-mandarin` (option B) |
| Japanese Ladder | `NEXT_PUBLIC_BASE_PATH=/japanese-ladder` | `gh-pages` branch of `andifathulms/japanese-ladder` | `deploy-japanese` (option B) |
| Spanish Ladder | `NEXT_PUBLIC_BASE_PATH=/spanish-ladder` | `gh-pages` branch of `andifathulms/spanish-ladder` | `deploy-spanish` (option B) |

Arabic and Mandarin keep their live URLs (<https://andifathulms.github.io/arabic-ladder/>,
<https://andifathulms.github.io/mandarin-ladder/>), so learners' bookmarks and their saved progress
(`localStorage` is per origin + path) carry over. The `arabic-ladder` and `mandarin-ladder` repos
are now only deploy targets; development happens here.

CI (`build`, `e2e`) checks all three apps on every push and pull request: lint, unit tests
(English's run includes the engine's), `content:check`, and the Playwright suites. Mandarin's
hanzi fonts are subset at build time: CI fetches the source fonts (`npm run fonts:fetch -w
mandarin-ladder`, cached by the fetch script's hash) and subsets them before the tests and builds.
`deploy-arabic` and `deploy-mandarin` run on `main` after both pass.

## One-time setup for Arabic Ladder (option B)

1. **Make a deploy key** (an SSH key pair used only for this):
   ```bash
   ssh-keygen -t ed25519 -C "ladder monorepo → arabic-ladder gh-pages" -f arabic_pages_key -N ""
   ```
2. **Give the public key write access to the target repo**: `andifathulms/arabic-ladder` →
   Settings → Deploy keys → *Add deploy key*. Title `ladder monorepo`, paste
   `arabic_pages_key.pub`, tick **Allow write access**.
3. **Store the private key here as a secret**: this repo → Settings → Secrets and variables →
   Actions → *New repository secret*. Name `ARABIC_PAGES_DEPLOY_KEY`, value: the whole of
   `arabic_pages_key` (including the BEGIN/END lines). Then delete both key files locally.
4. **First publish**: run the workflow on `main` (push, or *Run workflow*). `deploy-arabic`
   creates the `gh-pages` branch in `arabic-ladder` with the built site.
5. **Switch Pages to the branch**: `arabic-ladder` → Settings → Pages → Source *Deploy from a
   branch*, branch `gh-pages`, folder `/ (root)`. The URL stays the same. Do this after step 4,
   so the site is never empty.
6. **Stop the old workflow**: `arabic-ladder`'s own `deploy.yml` now runs only by hand
   (`workflow_dispatch`), so a stray push there can't overwrite the monorepo's deploy. That
   change is on the `docs/moved-to-monorepo` branch of `arabic-ladder`; merge it.

To check a deploy: open the URL, then DevTools → Application → Service workers should show
`arabic-ladder-v0.1.0`, and Local storage should still hold `arabic-ladder:v1`.

A fine-grained personal access token (contents: read/write on `arabic-ladder` only) works too:
store it as `ARABIC_PAGES_TOKEN` and replace `deploy_key:` with `personal_token:` in the job.
The deploy key is preferred: it is scoped to one repo and isn't tied to a person.

## One-time setup for Mandarin Ladder (option B)

The same six steps as Arabic, with Mandarin's names:

1. `ssh-keygen -t ed25519 -C "ladder monorepo → mandarin-ladder gh-pages" -f mandarin_pages_key -N ""`
2. `andifathulms/mandarin-ladder` → Settings → Deploy keys: add `mandarin_pages_key.pub` with
   **Allow write access**.
3. This repo → Actions secrets: `MANDARIN_PAGES_DEPLOY_KEY` = the private key. Delete both files.
4. First publish: run the workflow on `main`; `deploy-mandarin` creates `gh-pages` in
   `mandarin-ladder`.
5. `mandarin-ladder` → Settings → Pages → *Deploy from a branch*, `gh-pages`, `/ (root)`.
6. `mandarin-ladder`'s own `deploy.yml` runs only by hand (`workflow_dispatch`), on its
   `docs/moved-to-monorepo` branch; merge it.

To check a deploy: the service worker is `mandarin-ladder-v1.0.0` and Local storage still holds
`mandarin-ladder:v1`.

## One-time setup for Japanese Ladder (option B)

The same steps as Mandarin, with Japanese's names. `japanese-ladder` is a new repo, so there is no old
workflow to stop (step 6).

1. `ssh-keygen -t ed25519 -C "ladder monorepo → japanese-ladder gh-pages" -f japanese_pages_key -N ""`
2. `andifathulms/japanese-ladder` → Settings → Deploy keys: add `japanese_pages_key.pub` with
   **Allow write access**.
3. This repo → Actions secrets: `JAPANESE_PAGES_DEPLOY_KEY` = the private key. Delete both files.
4. First publish: run the workflow on `main`; `deploy-japanese` creates `gh-pages` in
   `japanese-ladder`.
5. `japanese-ladder` → Settings → Pages → *Deploy from a branch*, `gh-pages`, `/ (root)`.

To check a deploy: the service worker is `japanese-ladder-v0.1.0` and Local storage holds
`japanese-ladder:v1`. Japanese's fonts are subset at build like Mandarin's (Klee One and Noto Sans
JP, fetched by `npm run fonts:fetch -w japanese-ladder`); its KanjiVG stroke files are committed in
`apps/japanese/public/strokes` (CC BY-SA 3.0).

## One-time setup for Spanish Ladder (option B)

The same steps as Japanese, with Spanish's names. `spanish-ladder` is a new, empty repo.

1. `ssh-keygen -t ed25519 -C "ladder monorepo → spanish-ladder gh-pages" -f spanish_pages_key -N ""`
2. `andifathulms/spanish-ladder` → Settings → Deploy keys: add `spanish_pages_key.pub` with
   **Allow write access** (or `gh repo deploy-key add spanish_pages_key.pub --allow-write -R andifathulms/spanish-ladder -t "ladder monorepo"`).
3. This repo → Actions secrets: `SPANISH_PAGES_DEPLOY_KEY` = the private key (or
   `gh secret set SPANISH_PAGES_DEPLOY_KEY < spanish_pages_key`). Delete both files.
4. First publish: run the workflow on `main`; `deploy-spanish` creates `gh-pages` in `spanish-ladder`.
5. `spanish-ladder` → Settings → Pages → *Deploy from a branch*, `gh-pages`, `/ (root)`.

Live since 2026-10-29 at <https://andifathulms.github.io/spanish-ladder/> (steps 1–5 done). To check a
deploy: the service worker is `spanish-ladder-v0.1.0` and Local storage holds
`spanish-ladder:v1`. Spanish needs no font fetching (Latin faces through `next/font`) and ships no
media yet (`apps/spanish/public/audio/SOURCE.md`).

### Mandarin's media in git

Mandarin ships recorded audio (`apps/mandarin/public/audio`, about 1,600 mp3s) and stroke data
(`public/strokes`, one JSON per character), about 19 MB in all, as plain files: no Git LFS. LFS
would complicate the Pages build and has bandwidth limits. Reconsider LFS (or moving media to a
release asset or CDN) if the repository grows past about 500 MB (`git count-objects -vH`).

## Adding another course

Pick one of these.

## Option A — one Pages site, each app under its own sub-path (recommended)

Build every app with its own base path and lay the outputs side by side into one artifact:

```
public-root/
  english/   -> apps/english/out   built with NEXT_PUBLIC_BASE_PATH=/<repo>/english
  japanese/  -> apps/japanese/out  built with NEXT_PUBLIC_BASE_PATH=/<repo>/japanese
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
      - { app: japanese, path: /ENGREPO/japanese }
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

For a brand-new course with no existing URL, start with **Option A**. Arabic Ladder uses option B
only because it already had its own live URL and learners with saved progress.

Option A: It needs no cross-repo tokens, keeps one source of truth, and a new
course is a few matrix lines plus a base path. Move a course to Option B only if it genuinely
needs its own domain or release schedule.
