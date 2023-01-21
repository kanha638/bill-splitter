/*
  Warnings:

  - You are about to drop the column `mobileNum` on the `Users` table. All the data in the column will be lost.
  - Added the required column `profile_urn` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "mobileNum",
ADD COLUMN     "profile_urn" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "createrID" TEXT NOT NULL,
    "invitedUsers" TEXT[],
    "active_users" TEXT[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "eventID" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyers" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "amount_spent" DOUBLE PRECISION NOT NULL,
    "expenseId" TEXT,

    CONSTRAINT "Buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payers" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "expenseId" TEXT,

    CONSTRAINT "Payers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyers" ADD CONSTRAINT "Buyers_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payers" ADD CONSTRAINT "Payers_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
