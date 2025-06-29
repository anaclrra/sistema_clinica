/*
  Warnings:

  - You are about to drop the column `dataHora` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "dataHora",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
