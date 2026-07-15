# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 01: Design System — completed
- Feature 02: Authentication (Clerk) — completed

## Current Goal

- Feature 03: Canvas (React Flow integration)

## Completed

### Feature 01 — Design System

- Installed shadcn/ui and lucide-react
- Defined dark theme CSS tokens in globals.css
- Created `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
- Added 7 UI primitives: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea
- Fixed shadcn CSS variables in `:root` to use dark values (removed light `.dark` fallback)
- Created EditorNavbar — fixed h-12 top navbar with sidebar toggle (PanelLeftOpen/PanelLeftClose)
- Created ProjectSidebar — floating overlay sidebar (w-72) with backdrop, Tabs (My Projects / Shared), empty placeholder states, and "New Project" button
- Wired editor chrome into page.tsx

### Feature 02 — Authentication (Clerk)

- Installed `@clerk/ui` for themes
- Added `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars
- Created `proxy.ts` at root with protected-first middleware (public: `/sign-in`, `/sign-up`)
- Wrapped root layout with `ClerkProvider`, applied `dark` theme from `@clerk/ui/themes`, mapped appearance variables to app CSS custom properties
- Created `app/sign-in/[[...sign-in]]/page.tsx` — two-panel layout (left: logo/tagline/features, right: `<SignIn />`), responsive with form-only on small screens
- Created `app/sign-up/[[...sign-up]]/page.tsx` — same layout with `<SignUp />`
- Created `app/editor/page.tsx` — moved editor chrome from root page to `/editor`
- Updated `app/page.tsx` — server component that redirects authenticated users to `/editor`, others to `/sign-in`
- Added `UserButton` to editor navbar right section with CSS variable-based appearance

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Populated `globals.css` with dark theme: Tailwind v4 `@theme inline` block, `:root` CSS custom properties matching UI context values, `@custom-variant dark`, and base body styles.
- Added `dark` class to `<html>` in `layout.tsx` so shadcn component `dark:` variant classes activate properly.
- All 7 UI components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea) were already using semantic tokens — no component changes needed.
- Editor chrome implemented per `02-editor.md` spec:
  - `editor-navbar.tsx` — ghost icon button with `PanelLeftOpen`/`PanelLeftClose`, `border-border` bottom border, `bg-card` surface
  - `project-sidebar.tsx` — backdrop overlay (black/50), slide transition, shadcn Tabs with ScrollArea in each panel, "New Project" button with `Plus` icon
  - `page.tsx` — `"use client"` with `useState` for sidebar state, full-viewport editor layout
