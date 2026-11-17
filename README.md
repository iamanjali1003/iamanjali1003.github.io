![Portfolio](.github/banner.png)

My personal site and blog, built with Next.js and published on GitHub Pages.

[Live](https://iamanjali1003.github.io) · [Writing](https://iamanjali1003.github.io/blog/) · [RSS](https://iamanjali1003.github.io/feed.xml)

## Stack

Next.js 16 (static export) · TypeScript · Tailwind CSS v4 · GitHub Actions

## Run it

```bash
pnpm install
pnpm dev
```

## Edit it

Everything the site says lives in `src/content/`: the profile, open-source
pull requests, projects, experience, skills and posts. Components are in
`src/components/`: `layout/` for the header, footer and column, `sections/` for
the home page sections, `shared/` for pieces used across them, and `blog/` for
what posts are written with.

## Write a post

1. Add an entry to `posts` in `src/content/writing.ts`.
2. Write the body in `src/content/posts/<slug>.tsx`.
3. Register it in `bodies` in `src/app/blog/[slug]/page.tsx`.

The post's share image, `/blog/<slug>/og.png`, is drawn from its title at build
time, and the post joins the RSS feed and the sitemap.

## Deploy

Pushing to `main` builds the site and publishes it to GitHub Pages.

## License

[MIT](LICENSE) © 2026 [Anjali](https://iamanjali1003.github.io)
