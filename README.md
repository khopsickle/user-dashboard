# Simple Dashboard

A small dashboard application that displays users in a searchable, sortable table.

## Setup

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Architecture

### Frontend

- **React**: for UI and functional components
- **React Router**: for navigation
- **Tailwind CSS**: for responsive styling, and styling utilities to help with accessbility
- **Axios**: for HTTP requests from JSONPlaceholder API
- **React Query**: for handling data and request load/error states

### Dev & Build Tools

- **Vite**: lightweight, quick development server for fast dev. can also generate static files for a production build
- **ESLint & Prettier**: code quality and formatting

### Testing

- **Jest**: component testing
- **React Testing Library**: integration testing

### Rationale

Overall, my stack decisions came down to benefit vs. complexity. Each dependency I chose to add gave a lot of convenience without adding too much extra code or requiring a large learning curve to use. Several other options were excluded for the sake of simplicity, time, and the scope of a small frontend dashboard.

**State Management**
I consider Redux overkill for the app in its current state. It would add a massive dependency and a ton of extra code for a relatively simple UI with only 2 views. Context API could also be used for state management, but React Query and local component state covers most of what we would need. There's no tangible benefit to adding complexity with Context API.

**API Requests**
Axios + React Query is a common React pattern. Axios handles the actual HTTP requests, as React Query still needs an HTTP client. React Query allows us to handle server state and additional utility with loading, caching, error, and success management.

As a bonus, I've also never actually used React Query before and wanted to check it out.

**Form Validation**
I considered Formik and React Hook Form for more professional and convenient form validation. But since the add user feature is fairly straightforward with simple string inputs and few required fields, I opted to use native React features. Adding a dependency and modifying the form for better performance could be a later improvement.

**Testing**
While the app could benefit from robust E2E testing, Jest + React Testing Library can cover all the major user paths without adding too much bloat or slowing down the testing process. Adding on Cypress or Playwright can be done further down the line if the app were to become more complex.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Static deployment to Netlify, Vercel, or GH Pages

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

---

Built with ❤️ using React Router.
