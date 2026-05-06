# Flow Timer - Agent Guide

## Project Overview
**Flow Timer** is a simple, privacy-respecting time-boxing timer that helps users focus by breaking work into clear task blocks.

- **Site URL**: https://timer.bryanhogan.com
- **Stack**: Astro 5, Svelte 5, TypeScript, Vite through Astro
- **Build Output**: Astro static site output in `dist`
- **Core Experience**: A client-side timer with task rows, progress display, optional browser notifications, and optional notification sounds
- **Privacy**: No personal data is collected; avoid adding server persistence or analytics without an explicit product decision

## Commands
- `npm run dev` - Start the Astro development server
- `npm run build` - Build the production site
- `npm run preview` - Preview the production build locally
- `npm run astro` - Run Astro CLI commands

## Key Architecture Rules
1. **Astro for pages/layout/SEO**: Keep routes, document metadata, OpenGraph/Twitter tags, canonical URLs, and shared layout behavior in Astro files.
2. **Svelte for interactive islands**: Timer controls and header toggles are Svelte components loaded with Astro client directives.
3. **Svelte 5 local state**: Use Svelte 5 runes such as `$state`, `$derived`, and `$effect` for component-local reactive state.
4. **Shared toggle state**: `src/stores/state.svelte.js` currently exposes `showOptions` and `showHowTo` with Svelte stores so separate client islands can communicate. Reuse this pattern for similar cross-island UI state unless doing a deliberate state refactor.
5. **Browser-only APIs**: Timer notifications and audio use browser APIs. Keep this logic inside client-loaded components or guard access to `window`, `Notification`, and `Audio` when moving code.
6. **No backend assumptions**: This is a static site. Do not add server endpoints, databases, or server-only Node APIs unless the project direction changes.
7. **Accessibility matters**: Preserve semantic buttons, labels, alt text, keyboard usability, and visible/focus states when changing controls.

## Project Structure
- `src/pages/` - Astro routes (`/`, `/about`, `/privacy`, `/404`)
- `src/layouts/BaseLayout.astro` - Global layout, metadata, canonical URLs, header/footer, global CSS imports
- `src/components/FlowTimer.svelte` - Main timer app and timer/task/notification behavior
- `src/components/Header.astro` - Header navigation and mobile menu behavior
- `src/components/Footer.astro` - Footer links and social/repo links
- `src/components/SettingsToggle.svelte` - Header settings toggle island
- `src/components/HowToToggle.svelte` - Header how-to toggle island
- `src/stores/state.svelte.js` - Shared UI state for options/how-to panels
- `src/styles/var.css` - Design tokens
- `src/styles/global.css` - Global typography and element styles
- `src/styles/reset.css` - CSS reset
- `src/styles/util.css` - Utility classes
- `public/icons/` - UI icons and logo
- `public/sounds/` - Notification sounds
- `public/images/` - Public preview/share images

## Styling & UI Conventions
- Use `src/styles/var.css` as the source of truth for colors, spacing, typography, radii, shadows, and transitions.
- Prefer existing CSS variables such as `--space-*`, `--color-*`, `--text-size-*`, `--border-radius-*`, and `--transition-normal`.
- Keep the current dark, minimal, focus-oriented visual direction.
- Use Astro components for static layout/navigation pieces and Svelte components only where interactivity is needed.
- Icons currently come from `public/icons/` or `src/components/Icons.ts`; keep icon usage consistent with nearby code.

## Route Map
- `/` - Main Flow Timer app
- `/about` - About Flow Timer
- `/privacy` - Privacy statement
- `/404` - Not found page
