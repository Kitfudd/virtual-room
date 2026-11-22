# ADR 0007: Cloudflare Workers static assets for hosting

## Status

Accepted (2026-11-17)

## Context

The build produces a folder of static files (`build/client`) containing prerendered HTML for every route, JavaScript, images, and GLB models ([ADR 0001](0001-react-router-framework-mode.md)). The requirements for the host include a global CDN, a preview for every pull request, automatic production deploys from `main`, HTTPS on `kitfud.com`, and a free tier. The domain and the `hello@kitfud.com` email routing have already been setup on Cloudflare.

## Decision

We will host the site on Cloudflare Workers as static assets only, with no Worker script:

- `wrangler.jsonc` points the assets directory at `build/client` and serves the prerendered 404 page for unknown paths.
- Deployments run from GitHub Actions, after the CI checks pass, using a version of Wrangler pinned in `package.json`.
- Every pull request gets a Worker Preview (`wrangler preview`) whose URL is posted to the PR and deleted when the PR closes.
- Every merge to `main` deploys to production (`wrangler deploy`).
- `kitfud.com` is attached to the Worker as a custom domain, and `www.kitfud.com` redirects to it.
- CI authenticates with a Cloudflare API token limited to editing Workers on this account, stored as the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

## Consequences

- Hosting costs nothing at the expected traffic, and the domain, DNS, email and hosting stay with one provider.
- CI is the only path to production, as nothing deploys without green checks.
- Previews are public URLs, so preview builds must tell search engines not to index them.
- Pull requests from forks don't receive the secrets, so they get CI checks but no preview.
- Adding server code later (for example an API route) only means adding a Worker script to the same deployment, but requests to it would count against the free plan's 100,000 requests a day.
