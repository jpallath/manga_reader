/*
  Warnings:

  - You are about to drop the column `chapterTitle` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `nextChapterId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `previousChapterId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `nextPageId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_nextChapterId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_nextPageId_fkey";

-- DropIndex
DROP INDEX "Chapter_nextChapterId_key";

-- DropIndex
DROP INDEX "Page_nextPageId_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapterTitle",
DROP COLUMN "nextChapterId",
DROP COLUMN "previousChapterId";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "nextPageId";
