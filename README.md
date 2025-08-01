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
- **React Query**: for handling data and request load/error states and saving new users

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
React Hook Form is lightweight and convenient for form validation. No need to handle error states or custom form validation, can also easily add additional input fields.

**Testing**
While the app could benefit from robust E2E testing, Jest + React Testing Library can cover all the major user paths without adding too much bloat or slowing down the testing process. Adding on Cypress or Playwright can be done further down the line if the app were to become more complex.

Regarding the tests themselves, since the project has known requirements and well-defined UI and API, both TDD and red-green-refactor approach seemed overkill. I opted to create a working application first then add key unit tests for component behavior.

## Building for Production

Create a production build:

```bash
npm run build
```

## To Do

required:

- unit tests
- docs
- comments
- virtualization

optional:

- prod build deployment
- integration tests
- accessibility tests

ui improvements:

- Add a clear button to search input
- Change search to trigger on keydown and add a debounce for performance optimization
- Add highlighting to active sort column
- Add up/down arrows active column heading to show the sort direction
- Add pagination for large page results
- Additional aria roles for screen readers; currently there are basic aria attributes and keyboard navigation
- Doesn't check for duplicate users

Built with ❤️ using React Router.
