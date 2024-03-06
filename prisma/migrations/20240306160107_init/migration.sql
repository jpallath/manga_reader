/*
  Warnings:

  - You are about to drop the column `nextPageId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_nextPageId_fkey";

-- DropIndex
DROP INDEX "Page_nextPageId_key";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "nextPageId",
ADD COLUMN     "nextPage_id" TEXT;
