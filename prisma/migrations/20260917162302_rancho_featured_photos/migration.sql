/*
  Warnings:

  - You are about to drop the `RanchoPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RanchoPhoto" DROP CONSTRAINT "RanchoPhoto_uploadedById_fkey";

-- DropTable
DROP TABLE "RanchoPhoto";

-- CreateTable
CREATE TABLE "RanchoFeaturedPhoto" (
    "id" TEXT NOT NULL,
    "galleryItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RanchoFeaturedPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RanchoFeaturedPhoto_galleryItemId_key" ON "RanchoFeaturedPhoto"("galleryItemId");

-- AddForeignKey
ALTER TABLE "RanchoFeaturedPhoto" ADD CONSTRAINT "RanchoFeaturedPhoto_galleryItemId_fkey" FOREIGN KEY ("galleryItemId") REFERENCES "GalleryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
