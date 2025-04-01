# Playwright WebKit Iframe Cookie Issue

## Overview

This repository provides a minimal reproduction of a specific cookie access issue in WebKit 18.4 (via Playwright). The issue demonstrates an inconsistency in cookie behavior where:

1. A cookie set on the parent domain is visible in HTTP requests from an iframe on a subdomain
2. The same cookie is NOT accessible via `document.cookie` in JavaScript within the iframe
3. This behavior is specific to WebKit 18.4 and differs from other browsers (Chrome, Firefox)

This reproduction case helps isolate and demonstrate the issue for debugging and verification purposes.

## Issue Tracking

This issue is being tracked in the Playwright repository: https://github.com/microsoft/playwright/issues/35439

## Prerequisites

- Node.js 20 or later
- npm 9 or later
- Playwright

## Setup

1. Clone the repository:
```bash
git clone git@github.com:jhogervorst/playwright-webkit-iframe-cookie-issue.git
cd playwright-webkit-iframe-cookie-issue
```

2. Install dependencies:
```bash
npm install
```

3. Configure your hosts file (`/etc/hosts` on Unix-like systems):
```
127.0.0.1 example.test
127.0.0.1 sub.example.test
```

4. Install Playwright browsers:
```bash
npx playwright install
```

## Running the Tests

1. Start the test server:
```bash
npm run server
```

2. In a new terminal, run the tests:
```bash
npm test
```

## Project Structure

- `server/` - Express.js server implementation
  - `index.js` - Main server file
  - `pages/` - HTML pages for testing
    - `main.html` - Parent page (example.test)
    - `iframe.html` - Iframe page (sub.example.test)
- `test/` - Playwright test files
  - `cookie-access.spec.js` - Test specifications
- `.github/workflows/` - GitHub Actions workflow configuration

## Test Cases

The project includes a test case that:
1. Verifies cookie is set on parent page
2. Verifies cookie is present in HTTP requests from iframe
3. Verifies cookie is accessible via `document.cookie` in iframe

The test will:
- Pass in Chromium and Firefox (cookies accessible)
- Fail in WebKit (cookies not accessible via `document.cookie`)

## Server Implementation

The Express.js server:
1. Serves the parent page on `http://example.test/`
2. Serves the iframe page on `http://sub.example.test/iframe`
3. Provides an API endpoint at `/api/check-cookie` to verify cookie presence in requests
4. Sets a test cookie with:
   - `SameSite=Lax`
   - Domain scoped to `example.test`
   - Non-HttpOnly (accessible to JavaScript)

## CI/CD

The project includes a GitHub Actions workflow that:
1. Sets up the Ubuntu environment
2. Configures the hosts file
3. Installs dependencies
4. Starts the test server
5. Runs the Playwright tests

## License

MIT
