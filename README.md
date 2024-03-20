[![🧪 Unit Tests (Jest) 🧪](https://github.com/securesign/rekor-search-ui/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/securesign/rekor-search-ui/actions/workflows/unit-tests.yaml)
[![codecov](https://codecov.io/gh/securesign/rekor-search-ui/graph/badge.svg?token=1QS2BK1PQL)](https://codecov.io/gh/securesign/rekor-search-ui)

This repo contains a simple UI for searching Search the Rekor public transparency log.

https://securesign.github.io/rekor-search-ui/

![Rekor UI Screenshot](assets/screenshot.png)

## Requirements

- [Node.js](https://nodejs.org/en) 18.x+
- Access to a [Rekor server](https://github.com/securesign/rekor), or a full deployment of [Trusted Artifact Signer (TAS)](https://access.redhat.com/documentation/en-us/red_hat_trusted_artifact_signer/2024-q1/html/deployment_guide/verify_the_trusted_artifact_signer_installation)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

### Unit Tests

Run all [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) unit tests:

```bash
npm run test
```

Launches the test runner in the interactive watch mode.

Tests are co-located and live as closely to corresponding code as possible.

## Deploy

The app is based on [Next.JS](https://nextjs.org/) and is automatically built & deployed to GitHub Pages when pushing to the `main` branch.

## Internal Server Configuration

This app supports overriding of the default rekor server instance for those running private instances of the Trusted Artifact Signer (TAS) stack.
Create a `.env.local` file at the root and include in it this environment variable

```properties
NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN=https://privaterekor.example.com
```
