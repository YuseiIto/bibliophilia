# Bibliophilia

![Bibliophilia](https://raw.githubusercontent.com/yuseiito/bibliophilia/master/logo.png)

## Requirements

- Node.js (Version is controlled by `.node-version`)
- npm

## Techinical Stack

This project uses the following technologies:

- [Remix](https://remix.run/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
    - 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)
- [Prisma](https://www.prisma.io/)
- [Storybook](https://storybook.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Biome](https://biomejs.dev/)
- [Mend Renovate](https://mend.io/renovate)

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

## Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for styling.
Also it uses [shadcn/ui](https://ui.shadcn.com/) as a base of the design system.
