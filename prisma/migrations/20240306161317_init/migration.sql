/*
  Warnings:

  - You are about to drop the column `nextPage_id` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nextPageId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "nextPage_id",
ADD COLUMN     "nextPageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Page_nextPageId_key" ON "Page"("nextPageId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_nextPageId_fkey" FOREIGN KEY ("nextPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
