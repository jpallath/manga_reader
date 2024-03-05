-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_nextChapterId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "previousChapterId" TEXT,
ALTER COLUMN "nextChapterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_nextChapterId_fkey" FOREIGN KEY ("nextChapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
