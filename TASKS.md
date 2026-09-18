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
- [x] `Cartaz` (poster image) field on Event: optional upload via the same
      `uploadPhoto`/`deletePhoto` helpers as the Gallery feature. Create:
      upload sets `posterUrl`. Edit: upload a new file replaces it (old file
      cleaned up from Storage by the `updateEvent` resolver, which diffs
      old vs. new `posterUrl`), or check "Remove current poster" to clear it
      (also cleaned up). Delete: `deleteEvent` resolver cleans up the poster
      too, mirroring `deleteGalleryItem`. Shown on the event detail page,
      and as a thumbnail on both the public and manage events lists.
      Hit and fixed a real MUI v9 bug along the way: `Checkbox` +
      `FormControlLabel` threw `Cannot read properties of undefined
      (reading 'disabled')` when server-rendered in this form; replaced
      with a plain native `<input type="checkbox">` (same pattern already
      used for the Contacts honeypot field).
      Verified end-to-end: create with poster, replace (old file actually
      gone from the Storage bucket listing, not just the DB), remove
      (Storage confirmed empty), delete event (no orphaned file).
- [x] Cartaz: accept PDF in addition to images (many real event posters are
      designed as PDFs). Added `uploadPoster()` (separate from `uploadPhoto`,
      which stays image-only for the Gallery feature) allowing `image/*` or
      `application/pdf`, raised to a 15MB limit, and `isPdfUrl()` to detect
      PDF posters by extension so they render as a "Ver cartaz (PDF)" link
      instead of a broken `<img>` tag - applied on the event detail page, the
      edit form's current-poster preview, and skipped entirely in the two
      list-page thumbnails (public `/events` and `/manage/events`).
      Investigated a user-reported "error" uploading a JPEG poster: could not
      reproduce with a real JPEG file end-to-end, so it wasn't type-specific;
      raised the poster size limit (8MB -> 15MB) as the most likely fix since
      real camera/phone photos can exceed 8MB, pending confirmation from the
      user with the exact error text if it recurs.
      Verified end-to-end: JPEG, PNG, and PDF posters all upload and display
      correctly (PDF as a working link, confirmed the file itself is
      fetchable from Storage, not just present in the bucket listing).

## Phase 6 — Gallery feature

- [x] Public gallery page (`/gallery`), grouped by event
- [x] Photo upload: Server Action reads the file(s) from FormData and uploads
      directly to Supabase Storage (`gallery-photos` bucket) via its REST API,
      then saves the public URL via `createGalleryItem`
- [x] Multi-photo upload: the file input accepts multiple files at once;
      each is uploaded and saved as its own gallery item sequentially
      (fail-fast on the first error, sharing the same caption/event), so
      you don't have to repeat the whole form per photo
- [x] Video: form field to paste a YouTube/Vimeo embed link, saved via
      `createGalleryItem` (no file upload)
- [x] Render photos as images, videos as embedded iframe/player
      (`GalleryItemCard`, shared with the Events feature)
- [x] Manage: edit caption / delete gallery item (delete also removes the
      underlying file from Storage for photos, not just the DB row)

## Phase 7 — Contacts feature

- [x] Public contact page with form (name, email, message)
- [x] Wire form to `submitContactMessage` mutation (Server Action)
- [x] Manage: inbox page listing submitted messages (`/manage/contacts`)
- [x] Honeypot field for spam mitigation — filled submissions get the same
      success redirect but are never persisted, so bots aren't tipped off

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

## Post-Phase-7 code review fixes

- [x] Raised Server Action body size limit to 10mb (Next.js defaults to 1MB,
      which would have silently broken most real phone-photo uploads against
      our 8MB app-level limit)
- [x] Clean up orphaned Storage file if `createGalleryItem` fails after upload
- [x] Redirect to `/login` instead of crashing if a session expires mid-form
      on a `/manage/*` page (new `runGatedMutation` helper in graphql-server.ts)
- [x] Fail loudly instead of silently defaulting to "now" when an event's date
      is missing
- [x] Normalize blank captions to `null` consistently on both create and edit
- [x] Removed unused `gqlFetch` client helper (dead code, nothing ever called it)
- Accepted as out-of-scope for this site's size: honeypot doesn't block a
  hand-crafted GraphQL request (would need rate-limiting/CAPTCHA to fully
  close), storage-delete failures on item deletion are logged not surfaced,
  and gallery/event relations do a Prisma query per row rather than batching
  (N+1) — all real but not worth the complexity at ~5 admins/small galleries

## UI: migrated to Material UI

- [x] Replaced Tailwind CSS with Material UI (MUI) v9 across every page and
      component, per user request
- [x] `src/theme.ts` + `src/components/ThemeRegistry.tsx` (theme must be
      created inside a Client Component — passing a `createTheme()` object as
      a prop from a Server Component fails, since it contains functions)
- [x] `src/components/LinkBehavior.tsx` wired as the theme's default
      `LinkComponent`/`MuiLink` component, so pages just pass a plain `href`
      string to `Button`/`CardActionArea`/`ListItemButton`/`Link` instead of
      `component={Link}` (passing the Next.js `Link` component reference
      itself across the Server/Client boundary also fails, same root cause)
- [x] Found and fixed: GraphQL execution results aren't guaranteed to be
      plain objects (graphql-js 17), which breaks passing them as props into
      a Client Component (`GalleryItemForm`'s event dropdown) - fixed by
      explicitly rebuilding plain object literals before passing down
- Verified end-to-end against a live dev server: every public/manage page
  renders (200, real MUI markup), and the three "use client"/form-heavy
  flows most likely to break (login, event creation, the Select-based
  gallery item form, and the contact form) all submit correctly

## Home page: Rancho Folclórico das Lavradeiras de Gondar section

- [x] `RanchoSection` model (singleton row, id fixed as `"rancho"`) for the
      editable description text, and `RanchoFeaturedPhoto` — a join table
      referencing existing `GalleryItem` rows, rather than a separate photo
      upload pipeline (per user's explicit design direction: reuse the
      Gallery table, reference photos from it instead of duplicating storage)
- [x] `GalleryItem.isFeaturedInRancho` computed field so the manage picker
      can show which photos are already featured
- [x] Home page renders the description (when set) and a photo grid (when
      any photos are featured) reusing the existing `GalleryItemCard`
- [x] `/manage/rancho`: edit description, list featured photos with a
      "Remove from Home page" action per photo
- [x] `/manage/rancho/add-photo`: picker over all gallery items not yet
      featured, each with a "Feature on Home page" action
- Verified end-to-end against a live dev server: set description -> shows
  on home page; upload a gallery photo -> feature it -> appears in the
  home page "Fotos" section and the manage list; unfeature -> disappears
  from both; test data cleaned up afterward (home page confirmed back to
  its empty state, matching what real visitors see before content exists)
- Still waiting on the user to provide the real description text and
  photos (they said they'd add both themselves via `/manage/rancho`,
  or send them here to add on their behalf)

## Historial section (new top-level nav item)

- [x] `HistorialSection` model (singleton row, id fixed as `"historial"`),
      same shape as `RanchoSection` but no photo gallery — just editable text
- [x] Public `/historial` page — title always shown, description or a
      "Sem conteúdo por enquanto" empty state
- [x] `/manage/historial` — single-field edit form (mirrors `/manage/rancho`'s
      description form)
- [x] Added to the main nav (`Nav.tsx`) and the Manage landing page's link list
- Verified end-to-end against a live dev server: page renders with the empty
  state, login + description update persists and shows on both the public
  page and the manage form, test data cleaned up afterward

## Production bug: Cartaz/Gallery uploads failing on Vercel only

- Reported: uploading a Cartaz worked on `localhost` but threw a 500 on
  `https://garcea.vercel.app`. Vercel's function logs (pulled via `vercel
  logs --follow`, since the browser only showed a generic error) showed the
  real cause: `TypeError: Cannot convert argument to a ByteString because
  the character at index 165 has a value of 9474 which is greater than
  255.` — thrown from the `fetch()` call in `uploadToStorage()`
  (`src/lib/supabase-storage.ts`).
- Character code 9474 is `│` (box-drawing vertical bar). `fetch()` headers
  must be Latin-1, so a stray `│` inside the `SUPABASE_SERVICE_ROLE_KEY`
  env var (used in the `Authorization`/`apikey` headers) broke every
  Storage upload on Vercel — Gallery photos too, since they share the same
  helper, not just Cartaz. Root cause: the key's value on Vercel had
  gotten corrupted, most likely from being copy-pasted out of a
  terminal/table view that wraps long lines with a `│` border character.
  `.env.local` had a clean copy, so it never reproduced locally.
- Fixed by the user: re-copied the `service_role` key directly from the
  Supabase dashboard and reset it in Vercel's Production + Preview
  environment variables, then redeployed. Confirmed working.
- Takeaway for any future "works locally, breaks on Vercel" report: check
  Vercel's function logs (`vercel logs --follow <url>` or the dashboard's
  Functions/Logs tab) first — the browser's generic 500 hides the real
  error, which was diagnosed here in one shot once the actual log line was
  visible.

## Event gallery carousel + home page visual refresh

- [x] Replaced the static photo grid on the event detail page
      (`/events/[id]`) with a swipeable carousel (`embla-carousel-react`,
      `src/components/GalleryCarousel.tsx`): prev/next `IconButton`s, dot
      navigation, responsive slide widths (1 per view on mobile, up to
      2.5 on desktop so the next slide peeks in). Hit the same "GraphQL
      results aren't plain objects" RSC boundary issue documented earlier
      for `GalleryItemForm` — fixed the same way, by rebuilding
      `event.galleryItems` as plain object literals before passing them to
      the client carousel.
- [x] Added `@mui/icons-material` (matching the installed MUI v9 version)
      for the carousel's arrow icons.
- [x] Home page refresh: full-bleed gradient hero (blue, sampled from the
      real logo colour `#0340d8`) with title, subtitle, and two CTA buttons
      ("Ver Eventos", "Conhecer a Nossa História"); the Rancho section is
      now wrapped in an outlined `Paper` card instead of sitting directly
      on the page background.
- [x] Theme (`src/theme.ts`): added a real `palette` (primary blue sampled
      from the logo, warm amber secondary), `shape.borderRadius: 12`,
      bolder heading weights, and `MuiButton` defaults (no shadow,
      no-uppercase text) for a more modern look site-wide.
- [x] Small polish: `GalleryItemCard` now lifts with a shadow on hover
      (used by the carousel, the gallery grid, and the Rancho photo grid).
- Verified against a live dev server: `tsc --noEmit`, `eslint`, and
  `next build` all clean; confirmed via real data (a live event with 7
  gallery items) that the carousel renders all 7 dots and images, all
  referenced JS chunks return 200 (no broken client bundle), and the home
  page hero/CTA markup renders. Could not visually screenshot — the
  sandboxed headless Chromium is missing system libraries
  (`libnspr4.so`) and there's no root access to install them - verified
  structurally via curl + rendered HTML instead, consistent with this
  project's established no-browser testing approach.

## Sticky header + site-wide modern styling pass

- [x] `Nav`'s `AppBar` changed from `position="static"` to `position="sticky"`
      (`top: 0`) so it stays visible while scrolling instead of scrolling
      out of view. Tried setting `zIndex` explicitly via an `sx` callback
      first - hit the RSC "functions can't cross the Server/Client boundary"
      issue documented earlier (`Nav` is a Server Component, `AppBar` a
      Client Component) - removed it since `MuiAppBar` already applies
      `theme.zIndex.appBar` by default, no override needed.
- [x] New `src/components/FormCard.tsx` (a small `Paper` wrapper) applied
      everywhere a bare form previously sat directly on the page background:
      Login, Contacts, `EventForm`, `GalleryItemForm`, the gallery caption
      edit form, and the Rancho/Historial description forms - one consistent
      "modern form" look across every page that has one.
- [x] `/manage` landing page: replaced the plain `List`/`ListItemButton`
      links with a responsive grid of hoverable `Card`s.
- [x] `/manage/events` list: replaced the plain bordered `Box` rows with
      `Card`s (hover shadow), matching `/events`' public list styling.
- [x] `/events` public list: added the same hover-lift treatment already
      used by `GalleryItemCard`/`GalleryCarousel` and the home page's
      Rancho photo grid, so every clickable card site-wide behaves the same.
- [x] `/historial` public page: wrapped the description in an outlined
      `Paper`, matching the Rancho section's card on the home page.
- Verified end-to-end: `tsc --noEmit`, `eslint`, `next build` all clean.
  All public pages return 200 via curl. For the authenticated `/manage/*`
  pages, curl-replicated logins to this dev server return a deterministic
  `Error: Connection closed.` from the `authenticate` Server Action -
  confirmed via `git stash` that this reproduces identically on the
  previous commit too, so it predates and is unrelated to this pass (not
  investigated further, out of scope for this task; the user has
  successfully logged in through a real browser both locally and on
  production, so this looks like a curl/wire-protocol replication
  limitation rather than an app bug). Verified the styled `/manage/*`
  pages directly instead by minting a valid Auth.js session JWT with
  `next-auth/jwt`'s `encode()` and passing it as a cookie - confirmed all
  of them return 200 and contain the expected new markup (`MuiPaper-root`
  in the wrapped forms, `MuiCard-root` rows, the new manage landing page's
  card grid).

## Official Contacts (emails and phone numbers shown on the public Contacts page)

- [x] New `OfficialContact` model (`id`, `type: OfficialContactType` enum
      `EMAIL | PHONE`, `value`, `createdAt`) - a flat list rather than a
      singleton row, so any number of emails and phone numbers can be added
      independently, matching how `GalleryItem.type` already discriminates
      photo vs. video with one table.
- [x] GraphQL: public `officialContacts` query, gated
      `createOfficialContact`/`deleteOfficialContact` mutations.
- [x] `/manage/official-contacts`: add form (`OfficialContactForm`, a
      type-select + value field that switches between an `email` and `tel`
      input depending on the selected type, mirroring `GalleryItemForm`'s
      type-dependent field) plus a list of existing contacts with delete
      buttons, added to the `/manage` dashboard's card grid.
- [x] Public `/contacts` page: shows all official emails (as `mailto:`
      links) and phone numbers (as `tel:` links) in a card above the
      message form, hidden entirely when there are none yet.
- Verified end-to-end against the live dev server and Supabase: created one
  email and one phone via a direct GraphQL mutation call (see below for why),
  confirmed both render correctly on `/contacts` (as working `mailto:`/`tel:`
  links) and on `/manage/official-contacts` (with working delete buttons),
  confirmed an unauthenticated mutation attempt is rejected
  (`UNAUTHENTICATED`), deleted both, and confirmed both pages return to
  their empty states.
- While testing, found that curl-replicated calls to *any* Server Action
  that ends in `redirect()` (not just this feature's - reproduced the same
  way against the pre-existing `updateHistorialSectionAction`) currently
  fail with a deterministic `Error: Connection closed.` on this dev
  server, matching the same pre-existing, unrelated issue already noted
  above for `authenticate`. Worked around it by exercising the same
  resolver code directly via `/api/graphql` (with the session cookie
  attached), which is a faithful test of the actual create/delete/gating
  logic even though it doesn't exercise the Server Action's `redirect()`
  wrapper itself.

## Events page: filter by year

- [x] `/events` reads a `?year=` search param, with a `EventYearFilter`
      client component (a `Select` that navigates via `router.push` on
      change) next to the page title. Defaults to the current year when
      no param is present, or when the param is missing/invalid/not one
      of the actual available years (any year that has at least one
      event, plus the current year even if it has none yet) - falls back
      to the current year rather than showing a blank page for an
      arbitrary or typo'd year in the URL.
- [x] Filtering itself is done in memory after fetching all events (no
      GraphQL query changes) - the dataset is small enough for a single
      community association that this is simpler than adding server-side
      filtering, consistent with this project's existing "don't
      over-engineer for this site's size" calls.
- [x] Empty state updated to name the selected year ("Não há eventos em
      2027.") instead of the generic "Ainda não há eventos.".
- Verified end-to-end against the live dev server and Supabase: with only
  the one real 2026 event, confirmed the default (no param) and an
  explicit `?year=2026` both show it, and an arbitrary out-of-range
  `?year=2020` correctly falls back to 2026 rather than showing blank.
  Then created a temporary second event dated in 2025 to properly
  exercise the filter: confirmed the default view shows only the 2026
  event (not 2025), and `?year=2025` shows only the 2025 one (not 2026) -
  then deleted the temporary event and confirmed the events list is back
  to just the one real event.

## Removed the Contacts message form

- [x] Per explicit request, removed the contact submission form entirely
      (name/email/message + honeypot field) - the public `/contacts` page
      now only shows the Official Contacts (emails/phones) from the
      previous feature, with a plain "Ainda não há contactos disponíveis."
      fallback if none are set.
- [x] Dropped the whole `ContactMessage` model/table (confirmed it held
      zero real rows first, so no data was lost) and every layer built on
      it: the `ContactMessage`/`ContactMessageInput` GraphQL types, the
      `contactMessages` query, the `submitContactMessage` mutation, the
      `/manage/contacts` inbox page, `src/app/contacts/actions.ts`, and
      `src/lib/queries/contacts.ts`. Removed the "Mensagens de Contacto"
      link from the `/manage` dashboard.
- Verified end-to-end: `tsc --noEmit`, `eslint`, `next build` all clean
  (had to delete the stale `.next` cache once, since it still referenced
  the deleted `/manage/contacts` route's generated types). Confirmed live:
  `/contacts` renders with no form markup, `/manage/contacts` now 404s
  even when authenticated (not just an auth redirect), the `contactMessages`
  GraphQL field is rejected by schema validation, and the two real emails
  the user had already added via Official Contacts still render correctly
  on the public page - left untouched, since that's real data, not test
  data from this session.

## Autoplay the centered video in the event gallery carousel

- [x] `GalleryItemCard` takes a new optional `autoPlay` prop; when set and
      the item is a video, appends `autoplay=1&mute=1&muted=1` to the
      embed URL (muted, since browsers generally block unmuted iframe
      autoplay regardless of user gesture) and adds the iframe's
      `allow="autoplay; fullscreen; picture-in-picture"` attribute needed
      for that to actually be permitted. Non-carousel usages
      (`/gallery`, the Rancho photo grid, manage pages) don't pass it, so
      their video behavior is unchanged.
- [x] `GalleryCarousel` passes `autoPlay={index === selectedIndex}` to
      each slide - Embla's default `align: "center"` already centers the
      selected slide, so "selected" and "centered" are the same slide,
      matching the request as written.
- Verified end-to-end against the live dev server: added a temporary test
  video as the event's newest (and therefore first/initially-centered)
  gallery item, confirmed via the rendered HTML that only its iframe `src`
  got the autoplay params while the event's other, pre-existing real video
  did not; deleted the test video afterward and confirmed the real one
  (now first) correctly picks up the autoplay params in its place, and
  that no other gallery items were affected.
- Noted but out of scope: that real pre-existing video's URL is a
  `youtu.be/...` short link rather than the `youtube.com/embed/...` format
  YouTube's iframe player actually needs, so it may not display/play at
  all regardless of this change - separate, pre-existing issue, flagged
  to the user rather than fixed here.

## Accept plain YouTube/Facebook links for the Gallery video field

- [x] New `src/lib/video.ts`: `normalizeVideoUrl()` converts a normal
      YouTube link (`youtube.com/watch?v=`, `youtu.be/`,
      `youtube.com/shorts/`, `m.youtube.com/...`) to the
      `youtube.com/embed/VIDEO_ID` form the iframe player actually needs,
      and a normal Facebook link (a video permalink, `fb.watch/...`, or
      `facebook.com/watch/?v=`) to Facebook's
      `facebook.com/plugins/video.php?href=...` embed form. Anything else
      (an already-built embed URL, e.g. Vimeo) passes through unchanged,
      so existing behavior for other providers isn't affected. This
      directly fixes the `youtu.be` link problem flagged in the previous
      entry - admins no longer need to hand-build an embed URL.
- [x] `createGalleryItemAction` runs the pasted video URL through
      `normalizeVideoUrl()` before saving, so the stored URL is always the
      embeddable form. Caption-only editing doesn't touch the URL, so
      nothing else needed to change.
- [x] `GalleryItemForm`'s video field relabeled to "Link do Vídeo (YouTube
      ou Facebook)" with matching placeholder/helper text, since admins
      now paste the normal link they'd share, not a hand-built embed URL.
- [x] `GalleryItemCard`'s autoplay-on-select helper (from the previous
      entry) is now platform-aware: Facebook's video plugin expects
      `autoplay=true`/`mute=true` (string booleans), not the `1`/`0` style
      YouTube (and most other embeds) use - added `isFacebookEmbedUrl()`
      to `video.ts` and branch on it.
- Verified: unit-style checks of `normalizeVideoUrl()` against 9 real-world
  URL shapes (youtu.be, watch?v=, watch?v=&list=, m.youtube.com, shorts,
  already-embed, a Facebook video permalink, fb.watch, facebook.com/watch)
  all produced the expected embeddable URL, and an invalid string
  correctly threw. Confirmed the actual Server Action wiring is correct by
  invoking `createGalleryItemAction` directly (bypassing curl, since the
  pre-existing unrelated "Connection closed" issue - see above - blocks
  curl-replicated Server Actions that redirect): normalization ran
  successfully before failing only on `headers()` needing a real request
  context, which a standalone script can't provide. Then did a full round
  trip via GraphQL directly with pre-normalized URLs: confirmed both a
  YouTube and a Facebook video render correctly on `/gallery`, and that
  adding the Facebook one to the live event's carousel correctly produces
  `autoplay=true&mute=true` (not `=1`) when it's the centered slide. All
  test gallery items deleted afterward; confirmed the real data (including
  a video the user had, in parallel, fixed themselves with a proper
  YouTube embed URL) was left untouched throughout.

## Fix: YouTube video showing "An error occurred. Please try again later."

- Reported: a real YouTube video on the live event page failed to play,
  showing YouTube's generic player error with a Playback ID (screenshot
  provided). Confirmed the video itself is fine (public, embeddable per
  YouTube's oEmbed API) and the stored URL was already a correctly-formed
  `youtube.com/embed/...` link, so this wasn't a URL-normalization issue.
- Root cause: fetched the live production HTML directly and found the
  video/Facebook `<iframe>` had **no `allow` attribute at all** (just
  `allowFullScreen`). Without an explicit `allow="...encrypted-media..."`,
  browsers deny that permission to a cross-origin iframe by default, and
  many YouTube videos require it for DRM-protected playback - failing with
  exactly this generic error instead of a clearer one.
- [x] Fixed in `GalleryItemCard.tsx`: the iframe's `allow` attribute now
      matches YouTube's own recommended embed permissions list
      (`accelerometer; autoplay; clipboard-write; encrypted-media;
      gyroscope; picture-in-picture; web-share`), taken directly from the
      iframe snippet YouTube's oEmbed API itself returns.
- Not yet deployed: this fix (and everything else committed since the
  user said "don't push" - Official Contacts, the events year filter,
  removing the Contacts form, carousel autoplay, and YouTube/Facebook
  link normalization) is local-only. Asked the user whether to push now
  since this directly fixes their reported bug; they chose to keep
  holding, so production still has the broken (no-`allow`) iframe until
  a future push.

## Fix: video left an empty gap below it in the carousel

- Reported (with screenshot): the video slide in the event carousel was
  much shorter than the photo slides next to it, leaving a large empty
  gap below it inside the card.
- Root cause: `GalleryItemCard` sized photos and videos by a fixed
  `aspect-ratio` (1:1 / 16:9). The carousel row's height was set by
  flexbox stretching to whichever slide happened to be tallest (the
  square photos), but the video's own `Card` only grew to its 16:9
  content height and never filled that stretched space, leaving the gap.
- [x] Added a `fillHeight` prop to `GalleryItemCard`: when set, the
      `Card` becomes a `height: 100%` flex column and the photo `img`/
      video `iframe` use `flex: 1; min-height: 0` instead of a fixed
      aspect ratio, so they fill whatever height they're given.
- [x] `GalleryCarousel` now gives its row an explicit height
      (`{ xs: 280, sm: 320, md: 360 }`) instead of relying on aspect-ratio
      to establish it, and passes `fillHeight` for every slide - so this
      works correctly even for a gallery that's all video with no photo
      to anchor the row height, not just the common case.
      Non-carousel usages (`/gallery`, Rancho grid, manage pages) don't
      pass `fillHeight`, so they keep their original aspect-ratio sizing.
- Verified: rebuilt, then inspected the actual generated CSS in the
  rendered HTML (not just the component code) to confirm `flex: 1;
  min-height: 0` landed on both the photo `<img>` and video `<iframe>`,
  the row's fixed height rule is present, and the `Card` has
  `height: 100%` as a flex column - all three pieces the fix depends on.

## Add restrained color across the rest of the site

- Home already had the gradient hero from an earlier pass; asked for the
  same "modern but not exaggerated" color treatment on every other page.
- [x] New `src/components/PageTitle.tsx`: a small colored circular icon
      badge next to the page's `<h1>`, alternating `primary` (blue, sampled
      from the logo) and `secondary` (amber) per page for variety without
      it being loud. Applied to every public and manage page's title:
      Events (list + detail, `EventIcon`), Gallery (`PhotoLibraryIcon`),
      Historial (`AutoStoriesIcon`, secondary), Contacts (`EmailIcon`,
      secondary), the Manage dashboard (`AdminPanelSettingsIcon`), and
      each Manage sub-page ((Events/Gallery primary, Rancho/Historial
      secondary, Official Contacts primary) - matching the icon each gets
      on the dashboard's own link tile for consistency.
      Login gets its own centered variant (same badge, centered layout)
      since its narrow card doesn't fit the row-based `PageTitle`.
- [x] `FormCard` gets a thin `primary`-colored top border - one small
      unifying touch that now colors every form site-wide (login, event/
      gallery item forms, Rancho/Historial description forms, Official
      Contacts) without repeating it by hand in six places.
- [x] Event dates (list, detail, and the manage events list) changed from
      plain grey text to a small `secondary`-colored `Chip`.
- [x] Gallery page: each event group's heading gets a small `primary`
      count `Chip` (how many items in that group).
- [x] Manage dashboard tiles: each link now has the same colored icon as
      its destination page, in a small circular badge, instead of plain
      text-only cards.
- Verified: `tsc --noEmit`, `eslint`, `next build` all clean (had to drop
  an import that became unused after replacing a page's title with
  `PageTitle`). Confirmed live against the dev server: every touched
  public and authenticated manage page returns 200, and inspected the
  actual generated CSS (not just the component code) to confirm the icon
  badge's blue background, the secondary-colored chip class, and the
  form card's colored top border are all really present in the rendered
  page, not just written in the source.

## Site footer: social media links (manageable) + reserved rights

- [x] New `SocialLink` model (`id`, `platform: SocialPlatform` enum
      `FACEBOOK | INSTAGRAM | YOUTUBE | TWITTER | WHATSAPP | OTHER`,
      `url`, `createdAt`) - a flat list like `OfficialContact`, so any
      number of links can be added/removed independently.
- [x] GraphQL: public `socialLinks` query, gated
      `createSocialLink`/`deleteSocialLink` mutations.
- [x] `src/components/SocialIcon.tsx`: maps each platform to its
      `@mui/icons-material` icon (Facebook/Instagram/YouTube/Twitter/
      WhatsApp, `Language` as a generic fallback for "Outro") plus the
      Portuguese label shown in the manage form's `Select` - shared
      between the footer and the manage page so they can't drift.
- [x] `src/components/Footer.tsx` (new, added to the root layout after
      `{children}`, so it sits at the bottom on every page via the
      existing `flex column` + `flex: 1` main-content layout): shows
      "© {current year} Associação GARCEA. Todos os direitos
      reservados." plus one icon button per social link (opens in a new
      tab), and simply omits the icon row entirely when there are none
      yet.
- [x] `/manage/social-links`: add form (platform `Select` + URL field)
      and a list of existing links with delete buttons, mirroring
      Official Contacts' structure exactly. Added to the `/manage`
      dashboard's card grid.
- Verified end-to-end against the live dev server and Supabase: created
  a Facebook and an Instagram link via a direct GraphQL mutation call,
  confirmed both render correctly in the footer (correct `href`,
  `target="_blank"`, `aria-label`, and the right icon's SVG - checked by
  its `data-testid`) on more than one page, and in the manage list;
  confirmed an unauthenticated mutation attempt is rejected
  (`UNAUTHENTICATED`); deleted both and confirmed the footer's icon row
  disappears entirely (not just empty) and the manage page shows its
  empty state.

## Home page: carousel for the Rancho "Galeria de Fotos" section

- [x] Replaced the static photo grid under "Galeria de Fotos" on the home
      page with the same `GalleryCarousel` already used on the event
      detail page - same prev/next arrows, dot navigation, and fixed-
      height fill for photos/videos. Rebuilt the featured photos as plain
      object literals before passing them in, same as the event page fix
      (GraphQL execution results aren't guaranteed to be plain objects,
      which breaks passing them into a Client Component).
- Verified against the live dev server with the real featured Rancho
  photos already in the database (2 of them): the carousel renders both
  dots, both images load from Supabase Storage, and prev/next controls
  are present - no test data needed since real content already existed.

## Remove the "Galeria" nav tab

- [x] Per explicit clarification ("only the tab"), removed just the
      `/gallery` entry from `Nav.tsx`'s link list. The public `/gallery`
      page itself, `/manage/gallery` (admin upload/edit), and every
      feature built on gallery items (event carousels, the home page's
      Rancho photos) are all untouched - `GalleryItemCard`/
      `GalleryCarousel` are used well beyond this one page.
- Verified: nav no longer renders a "Galeria" link, `/gallery` still
  returns 200 when visited directly, `next build` still lists both
  `/gallery` and `/manage/gallery` as real routes.

## Open Question (blocking Phase 8 decision)

- [ ] Confirm: are all admin accounts fully equal, or should one be a "primary" owner
      that can't be removed by the other?
