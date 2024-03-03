/*
  Warnings:

  - A unique constraint covering the columns `[nextChapterId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapter` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterTitle` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextChapterId` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "chapter" INTEGER NOT NULL,
ADD COLUMN     "chapterTitle" TEXT NOT NULL,
ADD COLUMN     "nextChapterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_nextChapterId_key" ON "Chapter"("nextChapterId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_nextChapterId_fkey" FOREIGN KEY ("nextChapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
