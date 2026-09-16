# Associação GARCEA — Task List

Derived from [PLAN.md](./PLAN.md). Check items off as they're completed.

## Phase 1 — Setup

- [x] Scaffold Next.js app (TypeScript, App Router)
- [x] Init git repository, initial commit
- [x] Create GitHub repo under github.com/piresmario (e.g. `garcea`), add as `origin`, push initial commit
- [x] Create Supabase project
- [ ] Create Supabase Storage bucket for gallery photos
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

- [ ] Build root layout with nav: Home, Gallery, Events, Contacts, Login
- [ ] Build Home page with GARCEA intro content
- [ ] Build Login page (form -> Auth.js `signIn`)
- [ ] Add logged-in state to nav (show "Manage" / "Logout" when authenticated)
- [ ] Add middleware or layout check to protect `/manage/*` routes (redirect to login if no session)

## Phase 5 — Events feature

- [ ] Public events list page (`/events`)
- [ ] Public event detail page (`/events/[id]`), shows related gallery items
- [ ] Manage: create event form (`/manage/events/new`)
- [ ] Manage: edit event form (`/manage/events/[id]/edit`)
- [ ] Manage: delete event action (with confirmation)

## Phase 6 — Gallery feature

- [ ] Public gallery page (`/gallery`), grouped/filterable by event
- [ ] Photo upload: frontend upload flow to Supabase Storage, save resulting URL via mutation
- [ ] Video: form field to paste YouTube/Vimeo embed link, save via mutation
- [ ] Render photos as images, videos as embedded iframe/player
- [ ] Manage: edit caption / delete gallery item

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
