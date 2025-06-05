/*
  Warnings:

  - You are about to drop the column `location` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "location",
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
