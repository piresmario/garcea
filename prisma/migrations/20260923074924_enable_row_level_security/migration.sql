-- Enable Row-Level Security on all public tables.
--
-- Supabase auto-exposes every table in the "public" schema through its
-- PostgREST API. Without RLS enabled, anyone with the project URL (and the
-- anon key) can read, edit, or delete all rows in these tables. The app
-- itself talks to Postgres directly through Prisma as the table owner, which
-- always bypasses RLS, so this has no effect on the app's own behavior — it
-- only blocks access from roles without BYPASSRLS (e.g. anon/authenticated
-- via PostgREST).
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "GalleryItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HomeSection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HomeSectionFeaturedPhoto" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HistorialSection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OfficialContact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SocialLink" ENABLE ROW LEVEL SECURITY;
