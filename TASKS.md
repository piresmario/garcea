# Associação GARCEA — Task List

Derived from [PLAN.md](./PLAN.md). Check items off as they're completed.

## Phase 1 — Setup

- [x] Scaffold Next.js app (TypeScript, App Router)
- [x] Init git repository, initial commit
- [x] Create GitHub repo under github.com/piresmario (e.g. `garcea`), add as `origin`, push initial commit
- [x] Create Supabase project
- [x] Create Supabase Storage bucket for gallery photos (`gallery-photos`, public)
- [x] Add `.env.local` with Supabase DB connection string, Supabase keys, Auth.js secret
- [x] Add `.gitignore` (node_modules, .env*, .next)
- [x] Install core dependencies (prisma, @prisma/client, next-auth, graphql, graphql-yoga)

## Phase 2 — Database & Auth

- [x] Write Prisma schema: `User`, `Event`, `GalleryItem`, `ContactMessage`
- [x] Run initial Prisma migration against Supabase
- [x] Write seed script to create the first admin `User` (hashed password)
- [x] Configure Auth.js: Credentials provider (no Prisma adapter needed — Credentials + JWT sessions read/write `User` directly via Prisma, an Adapter is only for DB sessions/OAuth)
- [x] Implement password hashing/verification (bcrypt) in the credentials `authorize` callback
- [x] Configure session strategy (JWT) and expose user id in session
- [x] Verify login works against the seeded admin account

## Phase 3 — BFF/GraphQL layer

- [x] Create `/app/api/graphql/route.ts` GraphQL server (graphql-yoga)
- [x] Define GraphQL schema (typeDefs) for User, Event, GalleryItem, ContactMessage
- [x] Build GraphQL context that reads the Auth.js session server-side
- [x] Write query resolvers (public): events, gallery items (by event), contact form is write-only
- [x] Write mutation resolvers (session-gated): createEvent, updateEvent, deleteEvent
- [x] Write mutation resolvers (session-gated): createGalleryItem, updateGalleryItem, deleteGalleryItem
- [x] Write mutation resolver (public): submitContactMessage
- [x] Write query resolver (session-gated): list contact messages
- [x] Add a small `requireUserId(context)` helper used by all gated resolvers
- [x] Frontend GraphQL clients pointing at `/api/graphql`: `executeGraphQL` (in-process, for Server Components) and `gqlFetch` (HTTP, for Client Component mutations) — skipped Apollo Client/urql as unnecessary weight for a ~5-page site; easy to swap in later if needed

## Phase 4 — Core layout & pages

- [x] Build root layout with nav: Home, Gallery, Events, Contacts, Login
- [x] Build Home page with GARCEA intro content
- [x] Build Login page (Server Action -> Auth.js `signIn`)
- [x] Add logged-in state to nav (show "Manage" / "Logout" when authenticated)
- [x] Add `src/proxy.ts` (Next.js 16 renamed `middleware.ts` -> `proxy.ts`, now
      Node.js runtime by default) to protect `/manage/*` via `callbacks.authorized`
      in `src/auth.ts`; unauthenticated requests redirect to `/login`
- [x] Added minimal stub pages for `/gallery`, `/events`, `/contacts`, and a
      `/manage` landing page so all nav links resolve (Phases 5-8 replace these)

## Phase 5 — Events feature

- [x] Public events list page (`/events`)
- [x] Public event detail page (`/events/[id]`), shows related gallery items
- [x] Manage: events list (`/manage/events`) + create event form (`/manage/events/new`)
- [x] Manage: edit event form (`/manage/events/[id]/edit`)
- [x] Manage: delete event action with confirmation page (`/manage/events/[id]/delete`)

## Phase 6 — Gallery feature

- [x] Public gallery page (`/gallery`), grouped by event
- [x] Photo upload: Server Action reads the file from FormData and uploads
      directly to Supabase Storage (`gallery-photos` bucket) via its REST API,
      then saves the public URL via `createGalleryItem`
- [x] Video: form field to paste a YouTube/Vimeo embed link, saved via
      `createGalleryItem` (no file upload)
- [x] Render photos as images, videos as embedded iframe/player
      (`GalleryItemCard`, shared with the Events feature)
- [x] Manage: edit caption / delete gallery item (delete also removes the
      underlying file from Storage for photos, not just the DB row)

## Phase 7 — Contacts feature

- [ ] Public contact page with form (name, email, message)
- [ ] Wire form to `submitContactMessage` mutation
- [ ] Manage: inbox page listing submitted messages (`/manage/contacts`)
- [ ] Basic spam mitigation (honeypot field or rate limit) on the public form

## Phase 8 — Account management

- [ ] Manage: page listing all admin accounts
- [ ] Manage: edit account (name, email, password change)
- [ ] Manage: add new admin account
- [ ] Manage: remove admin account (with confirmation, prevent removing the last remaining account)

## Phase 9 — Polish & deploy

- [ ] Responsive styling pass across all pages
- [ ] Basic loading/error states for GraphQL queries and mutations
- [ ] Deploy Next.js app to Vercel
- [ ] Configure production env vars on Vercel (Supabase URL/keys, Auth.js secret)
- [ ] Add custom domain `associacaogarcea.pt` (and `www.associacaogarcea.pt`) in Vercel project settings
- [ ] Update DNS at the domain registrar to point to Vercel (A/CNAME records Vercel provides)
- [ ] Set production `NEXTAUTH_URL=https://associacaogarcea.pt`
- [ ] Verify HTTPS/SSL is issued and working on the custom domain
- [ ] Verify production build against Supabase (DB + Storage) end to end
- [ ] Final smoke test: view all public pages, log in, add/edit/delete content, log out

## Open Question (blocking Phase 8 decision)

- [ ] Confirm: are all admin accounts fully equal, or should one be a "primary" owner
      that can't be removed by the other?
