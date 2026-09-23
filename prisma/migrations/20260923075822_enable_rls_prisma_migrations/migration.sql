-- Prisma's own migration-history table also lives in the "public" schema, so
-- Supabase's linter flags it as publicly accessible too. Close that gap the
-- same way as the app tables (see the previous migration for the rationale).
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
