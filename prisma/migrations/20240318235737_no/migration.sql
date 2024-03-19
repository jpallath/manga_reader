/*
  Warnings:

  - You are about to drop the column `shortName` on the `Series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "shortName";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
