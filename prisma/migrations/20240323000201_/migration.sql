-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
