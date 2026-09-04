# Maison Viva

Bold, colour-forward luxury fashion site — "Chromatica SS27". React + Vite + TypeScript.

## Local development

```bash
npm i
npm run dev
```

Opens at http://localhost:5173.

## Build

```bash
npm run build   # type-checks with tsc, then builds to /dist
npm run preview # serve the production build locally
```

## Deploy on Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket), or run `vercel`
   from inside this folder with the Vercel CLI.
2. Import the repo in the Vercel dashboard — `vercel.json` already tells it
   this is a Vite app (build: `npm run build`, output: `dist`), so no manual
   config is needed.
3. Deploy. Static SPA, no server/runtime required.

## Structure

```
├── index.html            ← loads Unbounded + Manrope, mounts #root
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vercel.json
├── src/
│   ├── main.tsx            ← React entry point
│   ├── MaisonViva.tsx      ← the site (typed component + data)
│   └── vite-env.d.ts
└── README.md
```

## Notes

- Palette: cobalt, coral, gold, magenta on a warm cream base — defined as CSS
  variables at the top of the `<style>` block inside `MaisonViva.tsx`.
- Fonts: Unbounded (display, uppercase headlines) + Manrope (body/UI), loaded
  via Google Fonts in `index.html`.
- Two custom scroll effects, both built on `IntersectionObserver` with no
  animation library: `Fade` (text) and `ColorWipe` (a colour panel that
  slides off images like a curtain, revealing them, colour chosen per item).
  Plus an infinite CSS-only marquee ticker. All respect
  `prefers-reduced-motion`.
- Imagery is hotlinked stock photography (Unsplash) — swap the `src` URLs in
  `PIECES` / `STORIES` / the hero and campaign sections for real product
  photography whenever ready.
