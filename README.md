# iamanjali1003.github.io

Personal portfolio site — a single, dependency-free HTML page published with GitHub Pages.

**Live:** <https://iamanjali1003.github.io>

## About

Everything lives in one self-contained `index.html`: markup, styles, and the theme
toggle sit in the same file. There is no build step, no framework, and no package
manager — open the file in a browser and it runs.

## Features

- Light and dark themes, with the visitor's choice persisted to `localStorage`
- Responsive layout that holds up from desktop down to mobile widths
- Sections for experience, projects, technical skills, achievements, and education
- Open Graph and Twitter card tags so shared links render a proper preview

## Tech

| Area     | Choice                                  |
| -------- | --------------------------------------- |
| Markup   | HTML5                                   |
| Styling  | Hand-written CSS with custom properties |
| Fonts    | Inter, JetBrains Mono (Google Fonts)    |
| Hosting  | GitHub Pages                            |

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
├── index.html   # the entire site: markup, styles, and theme script
└── README.md
```

## Deployment

GitHub Pages serves this repository from the `main` branch. Pushing to `main`
publishes the change — no pipeline or manual step involved.
