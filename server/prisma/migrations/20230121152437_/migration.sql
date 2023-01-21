/*
  Warnings:

  - Added the required column `createdAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invitations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
