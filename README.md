# BookNook

A small online library frontend built with Next.js App Router and TypeScript. Discover a book, borrow it for seven days, and return it for the next reader.

**Live site:** pending deployment.

## Features

- Classic black-and-yellow design with responsive desktop and mobile layouts.
- Three-slide Swiper hero with text navigation and a searchable library.
- Six newest arrivals, category shelves, and a searchable three-column catalog.
- Original published book covers and local custom-cover previews.
- Add, edit, and delete book interfaces with ownership and copy validation.
- Borrow confirmations, duplicate prevention, copy tracking, and returns.
- My Books, My Borrows with cover thumbnails, and My Profile.
- Accessible dialogs, toast feedback, loading, error and empty states, and a custom 404.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To review member pages, open Login and select **Open frontend demo**. No real account is created. Demo changes are stored only in this browser; Reset sample data restores the sample collection.

```sh
npm run typecheck
npm run build
npm run start
```

Vercel builds use its expected `.next` output directory. Local production builds use `.next-build` while development uses `.next`, so local build checks do not overwrite the running dev server's route manifests.

## Status

The frontend is a working demo. Better Auth, JWT, Express, MongoDB and imgbb integration are still pending. Demo guards and ownership checks are frontend behavior, not server security. See [FRONTEND_STATUS.md](./FRONTEND_STATUS.md) for the requirement checklist and verification limits.

Published edition cover URLs and source pages are recorded in `src/lib/books.ts`. Unavailable covers display an explicit fallback; uploaded images override the published cover. Lucide SVG assets include their license in `public/icons`.

Swiper is installed from the repository-local `vendor/swiper-12.0.3.tgz` because the package registry was unavailable during setup. The tarball was packed from the official library already installed locally and includes its MIT license.

## Live authentication and backend

The project now includes Better Auth email/password and Google integration, a MongoDB auth adapter, JWT token issuance, an authenticated imgbb upload route, and a live Express API transport. The default remains the browser-local preview until credentials are configured. See [LIVE_SETUP.md](./LIVE_SETUP.md) for the environment values and start commands.

Live MongoDB/OAuth/upload behavior has not yet been tested because credentials are not configured. Backend unit tests pass; they do not substitute for database integration tests.
