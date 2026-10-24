![Portfolio](.github/banner.png)

My personal site: one page, built with Next.js and shadcn/ui, exported as static files and published with GitHub Pages.

[Live](https://iamanjali1003.github.io)

## Overview

A single page with sections for experience, projects, skills, achievements,
education and contact. Everything the page says lives in typed data files under
`src/content/`, so updating it means editing data, not markup. `next build`
exports plain HTML, CSS and JavaScript, which GitHub Pages serves with no server.

## Features

- Monochrome design on shadcn/ui's neutral tokens, with square corners throughout
- Light and dark themes that follow the system setting, with a toggle; no flash on load
- On phones, the section links become a row that scrolls sideways under the header
- The header highlights the section you are reading
- Open Graph and Twitter cards, `schema.org/Person` JSON-LD, a sitemap and `robots.txt`
- Fonts self-hosted through `next/font`, so the page makes no requests to Google
- Skip link, landmark elements, visible focus rings, and `prefers-reduced-motion` support

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Icons | Lucide |
| Theme | next-themes |
| Fonts | Inter, JetBrains Mono |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## How it works

```
src/content/*.ts            the words: profile, experience, projects, skills, ...
        │
        v
src/components/             how they look
   EntriesSection ── EntryCard    experience, projects, achievements, education
   Hero, Skills, Contact          the one-off sections
   SiteHeader, SiteFooter
        │
        v
src/app/page.tsx            the order of the sections
        │
        v
next build  ──>  out/       static files, deployed to GitHub Pages
```

Four sections share one component, `EntriesSection`, which renders a list of
`Entry` objects as cards, so they cannot drift apart in style. Text in the
content files can use `**bold**` and `[label](url)`; `RichText` turns those into
markup.

## Getting started

Needs Node.js 20.9 or later and pnpm.

```bash
git clone https://github.com/iamanjali1003/iamanjali1003.github.io.git
cd iamanjali1003.github.io
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

## Scripts

```bash
pnpm dev      # development server
pnpm build    # static export into out/
pnpm start    # serve out/ locally
pnpm lint     # ESLint
```

## Editing the content

| To change | Edit |
| --- | --- |
| Name, bio, links, resume URL | `src/content/profile.ts` |
| A job | `src/content/experience.ts` |
| A project | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |
| Achievements | `src/content/achievements.ts` |
| Education | `src/content/education.ts` |

## Project structure

```
src/
├── app/
│   ├── layout.tsx          metadata, fonts, theme provider, JSON-LD
│   ├── page.tsx            the sections, in order
│   ├── globals.css         design tokens, light and dark
│   ├── icon.svg            favicon, the brand mark
│   ├── apple-icon.png
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/                 shadcn/ui: button, badge, card
│   ├── sections/           hero, skills, contact
│   ├── entries-section.tsx
│   ├── entry-card.tsx
│   ├── site-header.tsx     nav and scroll-spy
│   ├── site-footer.tsx
│   ├── theme-toggle.tsx
│   ├── rich-text.tsx
│   └── mark.tsx            the A monogram
├── content/                everything the page says
└── lib/utils.ts
public/
└── og-image.png            1200 x 630 social preview
```

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: it installs,
lints, builds, and publishes `out/` to GitHub Pages. In the repository's
**Settings → Pages**, the source must be set to **GitHub Actions**.

## License

[MIT](LICENSE) © 2026 [Anjali](https://iamanjali1003.github.io)
