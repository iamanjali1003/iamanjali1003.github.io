# iamanjali1003.github.io

Personal portfolio site — a single, dependency-free HTML page published with GitHub Pages.

**Live:** <https://iamanjali1003.github.io>

## About

Everything lives in one self-contained `index.html`: markup, styles, and the theme
toggle sit in the same file. There is no build step, no framework, and no package
manager — open the file in a browser and it runs.

## Features

- Monochrome design system built on shadcn/ui tokens (`--background`, `--muted-foreground`,
  `--border`, `--radius`) — black and white only, no accent colour
- Light and dark themes that follow the system preference, with the visitor's
  override persisted to `localStorage`
- [Lucide](https://lucide.dev) icons inlined as a single SVG sprite — no icon library at runtime
- Sections for experience, projects, technical skills, achievements, education and contact,
  with a scroll-spy that highlights the section you are reading
- Full SEO surface: canonical URL, Open Graph and Twitter card tags, a 1200×630 preview
  image, `schema.org/Person` JSON-LD, `robots.txt` and `sitemap.xml`
- Accessible by default: skip link, landmark elements, visible focus rings, and
  `prefers-reduced-motion` support

## Tech

| Area     | Choice                                          |
| -------- | ----------------------------------------------- |
| Markup   | HTML5, no framework and no build step           |
| Styling  | Hand-written CSS using shadcn/ui design tokens  |
| Icons    | Lucide, inlined as an SVG sprite                |
| Fonts    | Inter, JetBrains Mono (Google Fonts)            |
| Hosting  | GitHub Pages                                    |

## Running it locally

Clone the repository and open the page directly:

```bash
git clone https://github.com/iamanjali1003/iamanjali1003.github.io.git
cd iamanjali1003.github.io
open index.html
```

Or serve it over HTTP, which is closer to how GitHub Pages delivers it:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Structure

```
.
├── index.html     # the entire site: markup, styles, icon sprite, theme script
├── og-image.png   # 1200×630 social preview
├── robots.txt
├── sitemap.xml
└── README.md
```

## Deployment

GitHub Pages serves this repository from the `main` branch. Pushing to `main`
publishes the change — no pipeline or manual step involved.
