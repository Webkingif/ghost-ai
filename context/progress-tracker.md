# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 01: Design System — completed
- Feature 02: Authentication (Clerk) — completed
- Feature 04: Project Dialogs — completed
- Feature 05: Prisma Data Models — completed
- Feature 06: Project APIs — completed
- Feature 07: Wire Editor Home — completed

## Current Goal

- Feature next: Canvas (React Flow integration)

### Feature 08 — Editor Workspace Shell — completed

- Created `lib/project-access.ts` — `getCurrentIdentity()` returns `{ userId, email }` via Clerk; `checkProjectAccess()` queries Prisma to verify owner or collaborator status
- Created `components/editor/access-denied.tsx` — client component with centered layout, lock icon, message, and "Back to Editor" button
- Created `app/editor/[roomId]/page.tsx` — server component with server-side access checks: unauthenticated users redirect to `/sign-in`, unauthorized/missing projects render `AccessDenied`, authorized users get the workspace layout
- Created `app/editor/[roomId]/workspace-client.tsx` — client component managing sidebar and AI panel state, rendering the full-viewport workspace layout
- Extended `components/editor/editor-navbar.tsx` — added optional `projectName`, `onShare`, `onToggleAI`, `aiOpen` props for workspace context
- Extended `components/editor/project-sidebar.tsx` — added optional `activeProjectId` prop with `isActive` highlighting using `bg-accent-primary-dim`
- Canvas and AI chat areas are placholder text only — no real canvas logic, Liveblocks, sharing, or AI behavior
- TypeScript check passes with zero errors

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

### Feature 04 — Project Dialogs

- Created `lib/types.ts` — `Project` interface (id, name, slug, isOwner)
- Created `lib/data.ts` — `slugify()` utility and `MOCK_PROJECTS` array
- Created `hooks/use-project-dialogs.ts` — dedicated hook managing dialog state, form state, project list, loading state, and all actions (create/rename/delete)
- Created `components/editor/create-project-dialog.tsx` — name input with live slug preview, Cancel/Create footer
- Created `components/editor/rename-project-dialog.tsx` — prefilled input with auto-focus, Enter-to-submit, Cancel/Rename footer
- Created `components/editor/delete-project-dialog.tsx` — destructive confirmation, Cancel/Delete (destructive variant) footer
- Modified `components/editor/project-sidebar.tsx` — renders project items with hover-reveal rename (Pencil) and delete (Trash2) actions for owned projects; shared projects shown without actions; wires buttons to parent
- Modified `app/editor/page.tsx` — replaced canvas placeholder with editor home content (heading, description, New Project button), wired `useProjectDialogs` hook, renders all three dialogs

### Feature 05 — Prisma Data Models

- Created `prisma/models/project.prisma` with `Status` enum, `Project` and `ProjectCollaborator` models, indexes, unique constraints, and cascade delete relation
- Created `lib/prisma.ts` as a cached singleton branching on `DATABASE_URL` — uses Accelerate (`accelerateUrl`) for `prisma+postgres://`, direct `@prisma/adapter-pg` for `postgres://`
- Removed mock `Project` interface from `lib/types.ts` and `MOCK_PROJECTS` from `lib/data.ts`; defined local `Project` interface in the hook and sidebar component
- Ran `prisma migrate dev --create-only --name init` — generated migration SQL with both tables, enum, indexes, and foreign key
- Generated Prisma Client to `lib/generated/prisma/`

### Feature 06 — Project APIs

- Created `app/api/projects/route.ts` — `GET` lists current user's projects ordered by `createdAt desc`; `POST` creates a project (defaults name to `Untitled Project`, uses `@default(cuid())` ID strategy)
- Created `app/api/projects/[projectId]/route.ts` — `PATCH` renames project; `DELETE` removes project
- Both mutation routes enforce auth (`401`) and owner check (`403`)
- Non-owner or non-existent project returns `404`

### Feature 07 — Wire Editor Home

- Modified `POST /api/projects` to accept client-provided `id` for project/room ID alignment
- Created `lib/projects.ts` — server-side `getOwnedProjects()` and `getSharedProjects()` using Prisma directly
- Created `hooks/use-project-actions.ts` — real API-calling hook replacing mock `useProjectDialogs`:
  - Create: generates suffix, builds room ID from slug + suffix, POSTs to API, navigates to workspace
  - Rename: PATCHes API, refreshes server components
  - Delete: DELETEs API, redirects to `/editor` if deleting active workspace, otherwise refreshes
- Converted `app/editor/page.tsx` to server component fetching owned + shared projects via Clerk auth + data helper
- Created `app/editor/editor-home-client.tsx` — client component receiving server-fetched projects as initial data
- Updated `create-project-dialog.tsx` — shows room ID preview instead of slug
- Removed unused `slug` field from `project-sidebar.tsx` Project interface
- Deleted `hooks/use-project-dialogs.ts` (replaced by `use-project-actions`)

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Mock `Project` interface removed from `lib/types.ts` — Prisma-generated types will replace it when API routes are built.
- `DATABASE_URL` copied from `.env.local` to `.env` so Prisma CLI can resolve it via `dotenv/config` in `prisma.config.ts`.

## Session Notes

- Populated `globals.css` with dark theme: Tailwind v4 `@theme inline` block, `:root` CSS custom properties matching UI context values, `@custom-variant dark`, and base body styles.
- Added `dark` class to `<html>` in `layout.tsx` so shadcn component `dark:` variant classes activate properly.
- All 7 UI components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea) were already using semantic tokens — no component changes needed.
- Editor chrome implemented per `02-editor.md` spec:
  - `editor-navbar.tsx` — ghost icon button with `PanelLeftOpen`/`PanelLeftClose`, `border-border` bottom border, `bg-card` surface
  - `project-sidebar.tsx` — backdrop overlay (black/50), slide transition, shadcn Tabs with ScrollArea in each panel, "New Project" button with `Plus` icon
  - `page.tsx` — `"use client"` with `useState` for sidebar state, full-viewport editor layout
