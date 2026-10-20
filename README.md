# বাজার দর · BazarDor

A Bengali market-price website built for the Programming Hero beginner course. Compare everyday grocery prices, see today's biggest price changes, and check prices across markets in Bangladesh.

## Links

- Repository: [NazninAkthery/bazar-dor](https://github.com/NazninAkthery/bazar-dor)
- Live website: deployment pending (see setup below)
- Original assignment: [ASSIGNMENT.md](./ASSIGNMENT.md)

## Features

- Responsive Bengali interface based on the supplied Figma/Penpot design, with the original logo and banner image.
- Home page with six biggest price increases, six biggest decreases, and all products.
- Eight category pages with numeric sorting from lowest to highest price or highest to lowest.
- Live scrolling price ticker, Bengali numbers, and correct product units.
- Protected product pages with minimum, maximum, average, and individual market prices.
- BetterAuth email/password registration and login, plus Google and GitHub OAuth integration.
- Profile page and a separate form for updating the user's name.
- Loading skeletons, authentication toasts, error recovery, and friendly unknown-route pages.

## Technologies

Next.js App Router, React, JavaScript, Tailwind CSS, DaisyUI, BetterAuth, React Hot Toast, SQLite for local development, and PostgreSQL for deployment.

The code uses regular components, forms, arrays, and fetch calls. No extra state management or complex architecture is needed.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run setup
npm run dev
```

Open [localhost:3000](http://localhost:3000).

`npm run setup` creates an ignored `.env.local` with a random authentication secret and creates the local SQLite authentication tables. It never overwrites an existing environment file. Local email/password login works without an external database account.

Register at `/signup`, then sign in at `/signin`. Passwords need at least eight characters. Email verification and password reset are intentionally omitted as requested by the assignment.

## Environment variables

Use `.env.example` as a guide. Keep real credentials in `.env.local` or your hosting dashboard; never commit them.

| Variable                                    | Purpose                                                            |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `BETTER_AUTH_URL`                           | Website origin; `http://localhost:3000` locally                    |
| `BETTER_AUTH_SECRET`                        | Random secret of at least 32 characters                            |
| `DATABASE_URL`                              | PostgreSQL connection string for deployment; omit for local SQLite |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials                                           |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials                                           |

Google and GitHub buttons require their respective provider credentials. Create OAuth applications and allow these callbacks, replacing the origin with your deployed URL:

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

## Deploy to Vercel

1. Import this GitHub repository into Vercel using the Next.js preset.
2. Connect a persistent PostgreSQL database and set `DATABASE_URL`.
3. Set `BETTER_AUTH_URL` to the final HTTPS origin, and set a new random `BETTER_AUTH_SECRET`.
4. Configure the OAuth credentials and deployed callback URLs above.
5. Run `npm run setup` from a trusted local environment with `.env.local` pointing at that PostgreSQL database to create the auth tables. Keep the database connection string private.
6. Deploy using the default `npm run build` command. Update the live link above after a successful deployment.

SQLite is for local use. Do not use a local SQLite file for Vercel's temporary server filesystem. App Router handles direct visits and refreshes on category, product, and profile routes.

## Checks

```bash
npm run build
npm run test:smoke
npm run format:check
```

Run the smoke check while the local dev server is running and the local auth database has been set up. It creates a test account in that development database and checks public routes, unknown routes, protected redirects, registration, invalid login, successful login, profile updates, product details, and logout. Do not run this development check against a production database.

## Product data

Products come from the assignment's [Programming Hero API](https://openapi.programming-hero.com/api/bazardor/products). The two alternative API hosts in the assignment are tried if the main host fails. Product data is cached for five minutes; the site displays an error and retry button when all hosts are unavailable. Prices are indicative and can vary between markets.

## Project structure

```text
app/          Pages, route handlers, loading and error states
components/   Header, ticker, product cards, forms
lib/          Product API and authentication configuration
public/       Supplied logo and hero image
scripts/      Local setup and smoke check
```

Author: **Naznin Akthery** · miniahosan@gmail.com
