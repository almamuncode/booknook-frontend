# BookNook frontend status

## Implemented

- Next.js App Router and TypeScript with the approved black-and-yellow design.
- Three real Swiper slides, text-only navigation, keyboard support, and a Browse Books link on every slide.
- Six New Arrivals sorted by creation timestamp; the underlying array is not mutated.
- Original published book covers, full artwork preserved, and custom cover support.
- Public catalog with title/author search, category filtering, and three desktop columns.
- Private-page demo guard that waits for session restoration and preserves the intended destination.
- Add/edit forms, read-only reader identity, category/copy validation, cover validation, and browser-local preview persistence.
- Ownership checks, accessible confirmation dialog, and deletion prevention while copies are borrowed.
- Borrow confirmation, duplicate-borrow prevention, available-copy tracking, seven-day return dates, and return action.
- Borrow table with cover thumbnails, plus My Profile and responsive account navigation.
- Registration password checks and a Forgot Password notice without implementing reset or verification.
- Shared layout, page titles, 404, loading spinner, route error boundary, toast feedback, and responsive empty states.
- No directional arrow icons or text characters. Search inputs do not use the old purple focus outline.

## Verification performed

- TypeScript and production build pass.
- Data assertions: latest-arrival ordering, limit, empty input, and no mutation of the input list.
- Browser: Swiper next slide and active-slide accessibility; intended private-page redirect; demo entry; cover-required validation; editing; delete confirmation and deletion; borrowing; duplicate-borrow disabled state; session and borrow persistence after refresh; borrow table; return action; reset sample collection; mobile menu/account menu; mobile Add Book and Profile layouts.
- The preview route-discovery issue was resolved by separating production build output (`.next-build`) from development output (`.next`).
- Local file chooser interrupted automated upload verification. Creation with an uploaded cover remains a manual QA item.
- Demo collection restored after tests.

## Integration and submission work still pending

- Better Auth with MongoDB adapter, email/password and Google, registration-to-login behavior, and real session handling.
- JWT validation and Express/MongoDB APIs, server-side ownership rules, and transaction-safe copy updates.
- Database-backed newest-six query using MongoDB sort and limit.
- imgbb/postimage upload; the current upload is a browser-local preview only.
- The brief lists HeroUI/DaisyUI/shadcn and Next.js; current styling is custom CSS. UI-toolkit alignment remains to be decided before submission.
- Real contact/social URLs; the current contact address is explicitly an example.
- Deployment URL, production-route refresh checks, and README live URL.
- Meaningful Git history: frontend now has 15 commits, including the initial commit and feature-based commits for the completed work. The server still needs its own history of at least eight notable commits. No empty commits were created.

## Dependency note

Swiper 12.0.3 is installed from `vendor/swiper-12.0.3.tgz`, packed from an existing official installed package because the npm registry was unavailable. The repository-relative tarball and lockfile keep fresh installations reproducible. Its MIT license is included in the package.

## Authentication and API integration update

Better Auth email/password and optional Google configuration, MongoDB adapter, JWT/JWKS, imgbb upload route, and live API transport are now implemented. `NEXT_PUBLIC_ENABLE_LIVE_API` selects live mode; it remains false until credentials are configured. Private member identity comes from the session, and live ownership uses the verified user ID. MongoDB connectivity, Google callbacks, uploads, and end-to-end live data flows remain unverified. See LIVE_SETUP.md.
