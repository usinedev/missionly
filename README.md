# Missionly

Missionly is a React + Vite frontend for a freelance mission marketplace. It showcases a public landing page, mission discovery with search/filter/pagination, detailed mission pages, and a basic dashboard shell. Data and auth are currently mocked in the frontend.

## Features
- Public landing page with mission search and category highlights
- Mission listing with query search, category filter, and pagination
- Mission detail view with company and mission metadata
- Auth modal with basic client-side validation
- Mocked auth stored in `localStorage`
- Mocked mission data for UI development
- Dashboard layout placeholder for future private features

## Routes
- `/` Home
- `/missions` Mission list and search
- `/missions/:id` Mission detail
- `/dashboard` Dashboard home (placeholder)

## Tech Stack
- React 19 + React Router
- Vite 7
- Sass (SCSS)
- SVGR for inline SVG React components
- Cypress for E2E tests

## Getting Started
1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

5. Lint the project:

```bash
npm run lint
```

## Testing (Cypress)
The E2E tests live in `cypress/e2e/tests_frontend.cy.js` and focus on search navigation behavior.

```bash
npx cypress open
```

or

```bash
npx cypress run
```

## Project Structure
- `src/pages` Public pages and dashboard pages
- `src/routes` App routing
- `src/layouts` Public and dashboard layouts
- `src/components` UI, cards, navigation, and auth components
- `src/services` API helpers and mock data (`missions.mock.js`, `auth.mock.js`)
- `src/styles` Global styles, components, layouts, and page styles
- `src/assets` Images and icons

## Notes
- Auth is mocked in `src/services/auth.mock.js` and uses `localStorage` only.
- Mission data is mocked in `src/services/missions.mock.js`.
- The alias `@` resolves to `src` (see `vite.config.js`).
