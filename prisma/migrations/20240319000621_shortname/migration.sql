/*
  Warnings:

  - You are about to drop the column `shorName` on the `Series` table. All the data in the column will be lost.
  - Added the required column `shortName` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "shorName",
ADD COLUMN     "shortName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
