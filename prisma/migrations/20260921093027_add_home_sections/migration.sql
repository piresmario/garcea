-- CreateTable
CREATE TABLE "HomeSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeSectionFeaturedPhoto" (
    "id" TEXT NOT NULL,
    "homeSectionId" TEXT NOT NULL,
    "galleryItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HomeSectionFeaturedPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeSectionFeaturedPhoto_homeSectionId_galleryItemId_key" ON "HomeSectionFeaturedPhoto"("homeSectionId", "galleryItemId");

-- AddForeignKey
ALTER TABLE "HomeSectionFeaturedPhoto" ADD CONSTRAINT "HomeSectionFeaturedPhoto_homeSectionId_fkey" FOREIGN KEY ("homeSectionId") REFERENCES "HomeSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeSectionFeaturedPhoto" ADD CONSTRAINT "HomeSectionFeaturedPhoto_galleryItemId_fkey" FOREIGN KEY ("galleryItemId") REFERENCES "GalleryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate existing Rancho content into the first Home Section
INSERT INTO "HomeSection" ("id", "title", "description", "order", "createdAt", "updatedAt")
SELECT "id", 'Rancho Folclórico das Lavradeiras de Gondar', "description", 0, "updatedAt", "updatedAt"
FROM "RanchoSection";

INSERT INTO "HomeSectionFeaturedPhoto" ("id", "homeSectionId", "galleryItemId", "createdAt")
SELECT "id", (SELECT "id" FROM "RanchoSection" LIMIT 1), "galleryItemId", "createdAt"
FROM "RanchoFeaturedPhoto";

-- DropForeignKey
ALTER TABLE "RanchoFeaturedPhoto" DROP CONSTRAINT "RanchoFeaturedPhoto_galleryItemId_fkey";

-- DropTable
DROP TABLE "RanchoFeaturedPhoto";

-- DropTable
DROP TABLE "RanchoSection";
