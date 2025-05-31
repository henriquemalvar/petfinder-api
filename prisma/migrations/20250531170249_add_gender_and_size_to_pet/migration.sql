/*
  Warnings:

  - Added the required column `gender` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN "gender" "PetGender" NOT NULL DEFAULT 'MALE',
ADD COLUMN "size" "PetSize" NOT NULL DEFAULT 'MEDIUM';

-- Remover os valores padrão após a migração
ALTER TABLE "Pet" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "size" DROP DEFAULT;
