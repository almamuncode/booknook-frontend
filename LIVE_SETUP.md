# Activate BookNook live mode

The frontend and backend code are connected, but live credentials must be configured before switching out of preview mode. No other project's credentials have been reused.

## Environment files

`booknook-frontend/.env.local` and `booknook-backend/.env` have been created locally and are ignored by Git. A random Better Auth secret was generated in the frontend environment file.

Configure these values:

| Value | Frontend | Backend |
| --- | --- | --- |
| MongoDB Atlas URI | `MONGODB_URI` | `MONGODB_URI` |
| Shared database name | `MONGODB_DB=booknook` | `MONGODB_DB=booknook` |
| Frontend origin | `BETTER_AUTH_URL=http://localhost:3000` | `FRONTEND_URL` and `AUTH_ISSUER` use the same value |
| Backend origin | `NEXT_PUBLIC_API_URL=http://localhost:5000` | `PORT=5000` |
| Token audience | `AUTH_AUDIENCE=http://localhost:5000` | Same `AUTH_AUDIENCE` |
| Google OAuth client | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Not needed |
| imgbb upload key | `IMGBB_API_KEY` | Not needed |

Use Atlas or a MongoDB replica set: copy updates and borrowing rely on transactions. Never put database credentials, the auth secret, Google secrets, or imgbb keys in `NEXT_PUBLIC_*` variables.

## Google OAuth

Use a Web Application client. Its authorized JavaScript origin is `http://localhost:3000`; its callback is `http://localhost:3000/api/auth/callback/google`. Add production equivalents when deploying. Email/password authentication works without Google credentials; the Google flow needs its configured provider.

## Start

1. Add the MongoDB URI to both local environment files.
2. Add Google and imgbb credentials to the frontend environment file.
3. Set frontend `NEXT_PUBLIC_ENABLE_LIVE_API=true`.
4. In `booknook-backend`, run `npm ci` and `npm run dev`.
5. In `booknook-frontend`, run `npm ci` and restart `npm run dev`.
6. Register with email/password. Registration goes to Login. Log in and add a book with an uploaded cover.
7. Optionally run `npm run seed` in the backend to add the six community sample books.

Email verification and password-reset methods are intentionally not enabled for this assignment. JWT signing is handled by Better Auth; Express verifies signatures using `/api/auth/jwks`, issuer, audience, and expiry.

## What has been checked

Frontend TypeScript and production compilation. Backend validation and JWT tests. Repository unit tests cover ownership, stock, duplicate borrows, transaction propagation, and return ownership.

## What still needs live verification

Actual MongoDB reads/writes and transaction behavior, registration/login against the configured database, Google callbacks, imgbb upload, and full browser borrowing with real accounts. Demo data is separate from live database records and is not silently uploaded.
