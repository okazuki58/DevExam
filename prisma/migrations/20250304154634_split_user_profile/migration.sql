/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `motivation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "githubUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "motivation",
DROP COLUMN "twitterUrl";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "motivation" TEXT,
    "githubUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "education" TEXT,
    "occupation" TEXT,
    "portfolioUrl" TEXT,
    "desiredRole" TEXT,
    "skills" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
