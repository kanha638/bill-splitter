/*
  Warnings:

  - You are about to drop the column `type` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNum` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_userID_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "type",
DROP COLUMN "userID",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "mobileNum" TEXT NOT NULL;
