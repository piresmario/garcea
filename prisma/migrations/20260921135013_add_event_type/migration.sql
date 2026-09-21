-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FOLCLORE', 'OUTROS');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'FOLCLORE';
