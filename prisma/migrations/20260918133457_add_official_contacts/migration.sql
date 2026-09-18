-- CreateEnum
CREATE TYPE "OfficialContactType" AS ENUM ('EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "OfficialContact" (
    "id" TEXT NOT NULL,
    "type" "OfficialContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfficialContact_pkey" PRIMARY KEY ("id")
);
