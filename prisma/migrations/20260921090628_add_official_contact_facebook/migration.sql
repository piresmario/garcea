-- AlterEnum
ALTER TYPE "OfficialContactType" ADD VALUE 'FACEBOOK';

-- AlterTable
ALTER TABLE "OfficialContact" ADD COLUMN     "label" TEXT;
