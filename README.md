# Two Bowls

A subscription meal-plan demo for households cooking for a person and a dog at the same time — "cook once, feed you both."

See [BRAND.md](./BRAND.md) for naming rationale and the visual system.

## What's here

- **Landing** (`/`) — pitch, how it works, sample recipe, pricing preview
- **Onboarding** (`/onboarding`) — playful multi-step form for owner + dog details
- **Plan** (`/plan`) — a generated weekly plan with the human/dog portion split as the visual centerpiece
- **Recipe detail** (`/recipe/:id`) — shared base, human/dog fork, shopping list, dog-safety note
- **Pricing** (`/pricing`) — Free / Plus / Ingredient Kit tiers

## Stack

React + Vite, Tailwind CSS, React Router (`HashRouter`, for GitHub Pages compatibility), no backend — onboarding answers persist to `localStorage` and drive a mock plan generator.

## Local development

```bash
npm install
npm run dev
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes it via GitHub Pages. In the repo's **Settings → Pages**, set the source to **GitHub Actions** (one-time setup) for this to take effect.
