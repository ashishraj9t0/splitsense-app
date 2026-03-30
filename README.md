# SplitSense App

SplitSense is a React app for tracking shared expenses, viewing group balances, and settling payments between members.

## Tech Stack

- React 19
- React Router DOM 6
- Create React App (`react-scripts`)
- TypeScript installed for future typing support

## Current App Flow

The app currently includes:

- Login and signup screens
- A protected dashboard
- Group detail pages
- Add expense flow
- Settlement flow

Routing is defined in [src/App.jsx](/c:/Projects/splitsense-app/src/App.jsx).

## Project Structure

```text
src/
  api/          API request helpers
  components/   Reusable UI components
  hooks/        App-specific hooks
  pages/        Route-level pages
  store/        Client-side state
  auth.js       Token helpers
  config.js     Runtime API configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The app runs on `http://localhost:3000` by default.

## Available Scripts

```bash
npm start
npm test
npm run build
```

- `npm start` launches the local development server
- `npm test` runs the test watcher
- `npm run build` creates a production build in `build/`

## Environment Configuration

The frontend API base URL is configured in [src/config.js](/c:/Projects/splitsense-app/src/config.js).

By default, the app uses:

```text
http://<current-host>:8080
```

You can override that with an environment variable:

```env
REACT_APP_API_URL=http://localhost:8080
```

Create a `.env` file in the project root if you want to set this locally.

## Notes

- Auth token helpers currently use `localStorage`
- Some hooks and screens still appear to use mock or in-progress data
- Real-time updates are structured around a WebSocket-based hook

## Build Output

Production files are generated into `build/`. That folder should not be committed for normal development workflows.
