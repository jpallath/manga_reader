-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
