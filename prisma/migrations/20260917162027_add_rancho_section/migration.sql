-- CreateTable
CREATE TABLE "RanchoSection" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RanchoSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RanchoPhoto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedById" TEXT NOT NULL,

    CONSTRAINT "RanchoPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RanchoPhoto" ADD CONSTRAINT "RanchoPhoto_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
